import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import crypto from 'node:crypto';

import { authMiddleware, type AuthRequest } from '../middleware/auth';
import { jwtSecret } from '../config/env';
import { db } from '../prisma/db';

const router = Router();

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeEmail(value: unknown): string | null {
    if (typeof value !== 'string') return null;
    const email = value.trim().toLowerCase();
    return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? email
        : null;
}

function createToken(userId: string): string {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
}

function publicUser(user: {
    id: string;
    email: string;
    username: string;
    avatarUrl: string | null;
}) {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
    };
}

router.post('/register', async (req, res) => {
    const body: unknown = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'Invalid registration data' });
    }

    const email = normalizeEmail(body.email);
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (
        !email ||
        username.length < 2 ||
        username.length > 80 ||
        password.trim().length < 8 ||
        Buffer.byteLength(password, 'utf8') > 72
    ) {
        return res.status(400).json({ message: 'Invalid registration data' });
    }

    const existingUser = await db.orm.User.where({ email }).first();
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const user = await db.orm.User.create({
        id: crypto.randomUUID(),
        email,
        password: await bcrypt.hash(password, 10),
        username,
    });

    return res.status(201).json({
        token: createToken(user.id),
        user: publicUser(user),
        requiresVerification: false,
    });
});

router.post('/login', async (req, res) => {
    const body: unknown = req.body;
    if (!isRecord(body)) {
        return res.status(400).json({ message: 'Invalid login data' });
    }

    const email = normalizeEmail(body.email);
    const password = typeof body.password === 'string' ? body.password : '';
    if (!email || !password.trim() || Buffer.byteLength(password, 'utf8') > 72) {
        return res.status(400).json({ message: 'Invalid login data' });
    }

    const user = await db.orm.User.where({ email }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({ token: createToken(user.id), user: publicUser(user) });
});

router.post('/logout', (_req, res) => res.status(204).end());

router.get('/me', authMiddleware, async (req, res) => {
    const userId = (req as AuthRequest).userId;
    const user = await db.orm.User.where({ id: userId }).first();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.json(publicUser(user));
});

export default router;