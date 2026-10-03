import { Router, type Request, type Response } from 'express';
import crypto from 'node:crypto';

import { authMiddleware, type AuthRequest } from '../middleware/auth';
import {
    type CardInput,
    isCompleteCard,
    parseCardInput,
    parseDraftInput,
    serializeTags,
    toCardResponse,
} from '../lib/card';
import { db } from '../prisma/db';

const router = Router();

function userIdFrom(request: Request): string {
    const userId = (request as AuthRequest).userId;
    if (!userId) {
        throw new Error('Authenticated request is missing userId');
    }
    return userId;
}

router.get('/', authMiddleware, async (req, res) => {
    const cards = await db.orm.Card
        .where({ userId: userIdFrom(req), status: 'published' })
        .all();
    return res.json(cards.map(toCardResponse));
});

router.get('/:cardId', authMiddleware, async (req, res) => {
    const card = await db.orm.Card
        .where({ id: String(req.params.cardId), userId: userIdFrom(req) })
        .first();

    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }

    return res.json(toCardResponse(card));
});

async function createCard(
    req: Request,
    res: Response,
    status: 'published' | 'draft',
) {
    let input: CardInput | null;
    if (status === 'draft') {
        input = parseDraftInput(req.body);
    } else {
        const parsed = parseCardInput(req.body);
        input = parsed && isCompleteCard(parsed) ? parsed : null;
    }
    if (!input) {
        return res.status(400).json({ message: 'Invalid card data' });
    }

    const card = await db.orm.Card.create({
        id: crypto.randomUUID(),
        userId: userIdFrom(req),
        ...input,
        tags: serializeTags(input.tags),
        status,
    });

    return res.status(201).json(toCardResponse(card));
}

router.post('/drafts', authMiddleware, async (req, res) =>
    createCard(req, res, 'draft'));

router.post('/', authMiddleware, async (req, res) =>
    createCard(req, res, 'published'));

router.patch('/:id', authMiddleware, async (req, res) => {
    const changes = parseCardInput(req.body, true);
    if (!changes) {
        return res.status(400).json({ message: 'Invalid card data' });
    }

    const { tags, ...textChanges } = changes;
    const databaseChanges = {
        ...textChanges,
        ...(tags === undefined ? {} : { tags: serializeTags(tags) }),
    };
    const updated = await db.orm.Card
        .where({ id: String(req.params.id), userId: userIdFrom(req) })
        .update(databaseChanges);

    if (!updated) {
        return res.status(404).json({ message: 'Card not found' });
    }

    return res.json(toCardResponse(updated));
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const deleted = await db.orm.Card
        .where({ id: String(req.params.id), userId: userIdFrom(req) })
        .delete();

    if (!deleted) {
        return res.status(404).json({ message: 'Card not found' });
    }

    return res.json(toCardResponse(deleted));
});

router.post('/:cardId/answer', authMiddleware, async (req, res) => {
    const card = await db.orm.Card
        .where({
            id: String(req.params.cardId),
            userId: userIdFrom(req),
            status: 'published',
        })
        .first();

    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }

    const answer =
        typeof req.body?.answer === 'string' ? req.body.answer.trim() : '';
    if (!answer) {
        return res.status(400).json({ message: 'Answer is required' });
    }

    return res.json({
        isCorrect:
            answer.toLocaleLowerCase() === card.answer.trim().toLocaleLowerCase(),
    });
});

export default router;