import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { env, assertServerConfiguration } from './src/config/env.js';
import { pool } from './src/config/db.js';
import { mainRouter } from './src/api/routes.js';
import { notFound } from './src/middleware/not-found.js';
import { errorHandler } from './src/middleware/error-handler.js';

export const app = express();
app.disable('x-powered-by');
app.use((req, res, next) => {
  req.id = randomUUID();
  res.set('X-Request-ID', req.id);
  next();
});
app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '256kb' }));

// The only API mount in the entry point, matching the forum project.
app.use('/api', mainRouter);
app.use(notFound);
app.use(errorHandler);

export function startServer() {
  assertServerConfiguration();
  const server = app.listen(env.port, () =>
    console.log('Abe Garage API listening on port ' + env.port),
  );
  let closing = false;
  const shutdown = () => {
    if (closing) return;
    closing = true;
    const timeout = setTimeout(() => process.exit(1), 10000);
    timeout.unref();
    server.close(async () => {
      try {
        await pool.end();
        clearTimeout(timeout);
        process.exit(0);
      } catch {
        process.exit(1);
      }
    });
  };
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
  return server;
}

// Importing app in routing tests must not open a listener or connect to MySQL.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) startServer();
