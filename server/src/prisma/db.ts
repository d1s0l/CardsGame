import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sqlite from '@prisma/orm-sqlite/runtime';
import type { Contract } from './contract.d';

const contractPath = join(__dirname, '../../src/prisma/contract.json');

const contractJson = JSON.parse(
  readFileSync(contractPath, 'utf8'),
) as Contract;

export function createDatabase(
  databasePath = process.env.CARDS_DB_PATH ?? join(__dirname, '../../dev.db'),
) {
  return sqlite<Contract>({ contractJson, path: databasePath });
}

export const db = createDatabase();