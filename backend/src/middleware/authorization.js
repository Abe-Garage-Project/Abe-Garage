import { AppError } from '../utils/errors/index.js';
export const hasRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) return next(new AppError('Authentication required', 401));
    if (!roles.includes(req.user.role_id)) return next(new AppError('Access denied', 403));
    next();
  };
