import assert from 'node:assert/strict';
import { copyFile, mkdtemp, rm } from 'node:fs/promises';
import { type Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { parseTags, serializeTags } from '../src/lib/card';

type App = typeof import('../src/app').app;
type DatabaseModule = typeof import('../src/prisma/db');

let app: App;
let database: DatabaseModule['db'];
let createDatabase: DatabaseModule['createDatabase'];
let testDatabase: ReturnType<DatabaseModule['createDatabase']> | undefined;
let testDirectory: string;
let testDatabasePath: string;
let server: Server | undefined;

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    avatarUrl: string | null;
  };
}

async function listen(): Promise<Server> {
  return new Promise((resolve, reject) => {
    const instance = app.listen(0, '127.0.0.1', () => resolve(instance));
    instance.once('error', reject);
  });
}

async function close(instance: Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    instance.close((error) => (error ? reject(error) : resolve()));
  });
}

function apiUrl(path: string): string {
  const address = server?.address();
  if (!address || typeof address === 'string') {
    throw new Error('Test HTTP server is not listening');
  }
  return `http://127.0.0.1:${address.port}${path}`;
}

function request(
  path: string,
  options: { method?: string; token?: string; body?: unknown } = {},
): Promise<Response> {
  const headers = new Headers({ 'content-type': 'application/json' });
  if (options.token) headers.set('authorization', `Bearer ${options.token}`);

  return fetch(apiUrl(path), {
    method: options.method ?? 'GET',
    headers,
    ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
  });
}

before(async () => {
  process.env.JWT_SECRET = 'cards-game-test-secret';
  testDirectory = await mkdtemp(join(tmpdir(), 'cards-game-api-'));
  testDatabasePath = join(testDirectory, 'test.db');
  await copyFile(join(process.cwd(), 'dev.db'), testDatabasePath);
  process.env.CARDS_DB_PATH = testDatabasePath;

  const appModule = await import('../src/app.js');
  const databaseModule = await import('../src/prisma/db.js');
  app = appModule.app;
  database = databaseModule.db;
  createDatabase = databaseModule.createDatabase;
  server = await listen();
});

after(async () => {
  if (server) await close(server);
  await testDatabase?.close();
  await database?.close();
  if (testDirectory) await rm(testDirectory, { recursive: true, force: true });
});

test('auth, card ownership, validation, drafts, and SQLite persistence', async () => {
  const ownerEmail = `cards-owner-${crypto.randomUUID()}@example.test`;
  const otherEmail = `cards-other-${crypto.randomUUID()}@example.test`;
  const password = 'test-password-123';

  const missingToken = await request('/api/auth/me');
  assert.equal(missingToken.status, 401);
  const invalidToken = await request('/api/auth/me', { token: 'invalid-token' });
  assert.equal(invalidToken.status, 401);
  const invalidPayloadToken = await request('/api/auth/me', {
    token: jwt.sign({ userId: 123 }, 'cards-game-test-secret'),
  });
  assert.equal(invalidPayloadToken.status, 401);

  const invalidRegistration = await request('/api/auth/register', {
    method: 'POST',
    body: { email: ownerEmail, username: 'owner', password: 'short' },
  });
  assert.equal(invalidRegistration.status, 400);

  const ownerRegistration = await request('/api/auth/register', {
    method: 'POST',
    body: { email: ` ${ownerEmail.toUpperCase()} `, username: ' owner ', password },
  });
  assert.equal(ownerRegistration.status, 201);
  const owner = await ownerRegistration.json() as AuthResponse;
  assert.match(owner.user.id, /^[0-9a-f-]{36}$/i);
  assert.equal(owner.user.email, ownerEmail);
  assert.equal(owner.user.username, 'owner');
  assert.equal('password' in owner.user, false);
  const storedOwner = await database.orm.User.where({ id: owner.user.id }).first();
  assert.ok(storedOwner);
  assert.notEqual(storedOwner.password, password);
  assert.equal(await bcrypt.compare(password, storedOwner.password), true);

  const duplicateRegistration = await request('/api/auth/register', {
    method: 'POST',
    body: { email: ownerEmail.toUpperCase(), username: 'other', password },
  });
  assert.equal(duplicateRegistration.status, 409);

  const login = await request('/api/auth/login', {
    method: 'POST',
    body: { email: ownerEmail.toUpperCase(), password },
  });
  assert.equal(login.status, 200);
  const ownerLogin = await login.json() as AuthResponse;
  assert.equal(ownerLogin.user.id, owner.user.id);

  const wrongPassword = await request('/api/auth/login', {
    method: 'POST',
    body: { email: ownerEmail, password: 'wrong-password' },
  });
  assert.equal(wrongPassword.status, 401);
  assert.deepEqual(await wrongPassword.json(), { message: 'Invalid email or password' });

  const me = await request('/api/auth/me', { token: owner.token });
  const profile = await request('/api/user/profile', { token: owner.token });
  assert.equal(me.status, 200);
  const profileData = await profile.json() as Record<string, unknown>;
  assert.deepEqual(await me.json(), profileData);
  assert.equal('password' in profileData, false);

  const otherRegistration = await request('/api/auth/register', {
    method: 'POST',
    body: { email: otherEmail, username: 'other', password },
  });
  assert.equal(otherRegistration.status, 201);
  const other = await otherRegistration.json() as AuthResponse;

  const cardInput = {
    title: 'React',
    question: 'What is useEffect?',
    answer: 'A hook for side effects',
    topic: 'React',
    tags: [' React ', 'Hooks'],
  };
  const forgedCard = await request('/api/cards', {
    method: 'POST',
    token: owner.token,
    body: { ...cardInput, id: 'forged-id', userId: other.user.id },
  });
  assert.equal(forgedCard.status, 400);

  const invalidCard = await request('/api/cards', {
    method: 'POST',
    token: owner.token,
    body: { ...cardInput, tags: ['valid', 5] },
  });
  assert.equal(invalidCard.status, 400);

  const cardResponse = await request('/api/cards', {
    method: 'POST',
    token: owner.token,
    body: cardInput,
  });
  assert.equal(cardResponse.status, 201);
  const card = await cardResponse.json() as {
    id: string;
    tags: string[];
    isDraft: boolean;
    title: string;
  };
  assert.match(card.id, /^[0-9a-f-]{36}$/i);
  assert.deepEqual(card.tags, ['React', 'Hooks']);
  assert.deepEqual(parseTags(serializeTags(card.tags)), card.tags);
  assert.deepEqual(parseTags('{broken-json'), []);
  assert.equal(card.isDraft, false);

  const ownerCards = await request('/api/cards', { token: owner.token });
  assert.deepEqual((await ownerCards.json() as Array<{ id: string }>).map(({ id }) => id), [card.id]);
  const otherCards = await request('/api/cards', { token: other.token });
  assert.deepEqual(await otherCards.json(), []);

  const otherGet = await request(`/api/cards/${card.id}`, { token: other.token });
  const otherPatch = await request(`/api/cards/${card.id}`, {
    method: 'PATCH',
    token: other.token,
    body: { title: 'stolen' },
  });
  const otherDelete = await request(`/api/cards/${card.id}`, {
    method: 'DELETE',
    token: other.token,
  });
  const otherAnswer = await request(`/api/cards/${card.id}/answer`, {
    method: 'POST',
    token: other.token,
    body: { answer: cardInput.answer },
  });
  assert.equal(otherGet.status, 404);
  assert.equal(otherPatch.status, 404);
  assert.equal(otherDelete.status, 404);
  assert.equal(otherAnswer.status, 404);

  const correctAnswer = await request(`/api/cards/${card.id}/answer`, {
    method: 'POST',
    token: owner.token,
    body: { answer: `  ${cardInput.answer.toUpperCase()}  ` },
  });
  assert.deepEqual(await correctAnswer.json(), { isCorrect: true });

  const partialUpdate = await request(`/api/cards/${card.id}`, {
    method: 'PATCH',
    token: owner.token,
    body: { title: 'Updated React' },
  });
  assert.equal(partialUpdate.status, 200);
  const updated = await partialUpdate.json() as typeof card & { question: string };
  assert.equal(updated.title, 'Updated React');
  assert.equal(updated.question, cardInput.question);

  const draftResponse = await request('/api/cards/drafts', {
    method: 'POST',
    token: owner.token,
    body: { title: '', question: 'unfinished', tags: [] },
  });
  assert.equal(draftResponse.status, 201);
  const draft = await draftResponse.json() as { id: string; isDraft: boolean };
  assert.equal(draft.isDraft, true);
  const cardsWithoutDrafts = await request('/api/cards', { token: owner.token });
  assert.deepEqual((await cardsWithoutDrafts.json() as Array<{ id: string }>).map(({ id }) => id), [card.id]);

  await close(server!);
  server = await listen();
  const cardAfterRestart = await request(`/api/cards/${card.id}`, { token: owner.token });
  assert.equal(cardAfterRestart.status, 200);
  assert.equal((await cardAfterRestart.json() as { title: string }).title, 'Updated React');

  const deleted = await request(`/api/cards/${card.id}`, {
    method: 'DELETE',
    token: owner.token,
  });
  assert.equal(deleted.status, 200);
  const cardsAfterDelete = await request('/api/cards', { token: owner.token });
  assert.deepEqual(await cardsAfterDelete.json(), []);

  const logout = await request('/api/auth/logout', { method: 'POST', token: owner.token });
  assert.equal(logout.status, 204);

  const reopenedCard = await request('/api/cards/drafts', {
    method: 'POST',
    token: owner.token,
    body: { title: 'Persistence', tags: ['SQLite'] },
  });
  assert.equal(reopenedCard.status, 201);
  const persistedDraft = await reopenedCard.json() as { id: string };

  await database.close();
  testDatabase = createDatabase(testDatabasePath);
  const persisted = await testDatabase.orm.Card.where({ id: persistedDraft.id }).first();
  assert.ok(persisted);
  assert.equal(persisted.status, 'draft');
  assert.deepEqual(JSON.parse(persisted.tags), ['SQLite']);
  await testDatabase.orm.User.where({ id: owner.user.id }).delete();
  await testDatabase.orm.User.where({ id: other.user.id }).delete();
});