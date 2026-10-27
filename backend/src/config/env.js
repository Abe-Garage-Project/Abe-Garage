import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)) });

function integer(name, fallback) {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value < 1) throw new Error(name + ' must be a positive integer');
  return value;
}
export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: integer('PORT', 5000),
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: integer('DB_PORT', 3306),
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'abe_garage',
    connectionLimit: integer('DB_CONNECTION_LIMIT', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    issuer: process.env.JWT_ISSUER || 'abe-garage-api',
    audience: process.env.JWT_AUDIENCE || 'abe-garage-staff',
    expiresIn: integer('JWT_EXPIRES_IN_SECONDS', 3600),
  },
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  timezone: process.env.GARAGE_TIMEZONE || 'Africa/Addis_Ababa',
  currency: process.env.CURRENCY_CODE || 'ETB',
  installEnabled: process.env.INSTALL_ENABLED === 'true',
  installSecret: process.env.INSTALL_SECRET || '',
});

export function assertServerConfiguration() {
  if (env.jwt.secret.length < 32)
    throw new Error('Set JWT_SECRET to a random value of at least 32 characters in backend/.env');
  if (!env.db.user) throw new Error('Set DB_USER in backend/.env');
}
