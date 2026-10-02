import { Router } from 'express';

import { authMiddleware, type AuthRequest } from '../middleware/auth';
import { db } from '../prisma/db';

const router = Router();

router.get('/profile', authMiddleware, async (req, res) => {
  const userId = (req as AuthRequest).userId;
  const user = await db.orm.User.where({ id: userId }).first();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
  });
});

export default router;