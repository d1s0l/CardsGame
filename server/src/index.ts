import { app } from './app';

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be a valid TCP port');
}

app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});