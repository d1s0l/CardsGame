import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';

export interface AuthRequest extends Request {
    userId: string;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization header is required' });
    }

    const parts = authorization.trim().split(/\s+/);
    const scheme = parts[0];
    const token = parts[1];
    if (
        parts.length !== 2 ||
        scheme?.toLowerCase() !== 'bearer' ||
        typeof token !== 'string' ||
        token.length === 0
    ) {
        return res.status(401).json({ message: 'Invalid authorization format' });
    }

    try {
        const payload = jwt.verify(token, jwtSecret);
        if (
            typeof payload !== 'object' ||
            payload === null ||
            typeof payload.userId !== 'string' ||
            !payload.userId
        ) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        (req as AuthRequest).userId = payload.userId;
        return next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};