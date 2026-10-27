import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/errors/index.js';
import { asyncHandler } from '../utils/async-handler.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  const match = /^Bearer ([^ ]+)$/i.exec(req.get('Authorization') || '');
  if (!match) throw new AppError('Authentication required', 401);
  let payload;
  try {
    payload = jwt.verify(match[1], env.jwt.secret, {
      algorithms: ['HS256'],
      issuer: env.jwt.issuer,
      audience: env.jwt.audience,
    });
  } catch {
    throw new AppError('Invalid or expired access token', 401);
  }
  if (
    !payload ||
    typeof payload !== 'object' ||
    payload.token_use !== 'access' ||
    !Number.isSafeInteger(payload.employee_id) ||
    payload.employee_id < 1 ||
    !Number.isInteger(payload.token_version) ||
    payload.token_version < 0 ||
    !Number.isFinite(payload.exp)
  ) {
    throw new AppError('Invalid access token', 401);
  }
  const [rows] = await pool.execute(
    'SELECT employee_id, role_id, active, token_version FROM employees WHERE employee_id = ?',
    [payload.employee_id],
  );
  const employee = rows[0];
  if (!employee) throw new AppError('Invalid access token', 401);
  if (!employee.active) throw new AppError('Account disabled', 403);
  if (employee.token_version !== payload.token_version)
    throw new AppError('Access token has been revoked', 401);
  req.user = { employee_id: employee.employee_id, role_id: employee.role_id };
  next();
});
