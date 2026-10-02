import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';

import authRouter from './routes/auth';
import cardsRouter from './routes/cards';
import userRouter from './routes/user';

export const app = express();

app.use(cors());
app.use(express.json({ limit: '32kb' }));

app.get('/', (_req, res) => {
  res.send('Server is working!');
});

app.use('/api/cards', cardsRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const isRecord = typeof error === 'object' && error !== null;
  const status = isRecord && 'status' in error ? error.status : undefined;
  const type = isRecord && 'type' in error ? error.type : undefined;

  if (status === 400 || type === 'entity.parse.failed') {
    res.status(400).json({ message: 'Invalid JSON request body' });
    return;
  }

  res.status(500).json({ message: 'Internal server error' });
};

app.use(errorHandler);