import { AppError } from '../utils/errors/index.js';
export const notFound = (req, res, next) => next(new AppError('Route not found', 404));
