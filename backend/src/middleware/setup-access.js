import { timingSafeEqual } from 'node:crypto';
import { env } from '../config/env.js';
import { AppError } from '../utils/errors/index.js';
export function setupAccess(req, res, next) {
  if (!env.installEnabled) return next(new AppError('Route not found', 404));
  const supplied = Buffer.from(req.get('X-Setup-Key') || '');
  const expected = Buffer.from(env.installSecret);
  if (
    !expected.length ||
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  )
    return next(new AppError('Setup access denied', 403));
  // BE-047 must additionally check persisted installation lock before any setup writes.
  next();
}
