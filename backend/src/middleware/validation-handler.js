import { validationResult } from 'express-validator';
import { AppError } from '../utils/errors/index.js';
export function validationHandler(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = Object.fromEntries(
    result.array({ onlyFirstError: true }).map((error) => [error.path || 'request', error.msg]),
  );
  next(new AppError('Validation failed', 400, { errors }));
}
