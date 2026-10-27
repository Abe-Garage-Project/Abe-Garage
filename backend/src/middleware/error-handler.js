import { AppError } from '../utils/errors/index.js';
export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  let statusCode = 500;
  let message = 'Something went wrong';
  let data = null;
  if (error instanceof AppError && error.isOperational) {
    statusCode = error.statusCode;
    message = error.message;
    data = error.data;
  } else if (error.type === 'entity.parse.failed') {
    statusCode = 400;
    message = 'Invalid JSON body';
  } else if (error.type === 'entity.too.large') {
    statusCode = 413;
    message = 'Request body is too large';
  } else if (error.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'A record with this unique value already exists';
  }
  // SQL text, request bodies and raw URLs may contain secrets: do not log them.
  if (statusCode >= 500)
    console.error({
      request_id: req.id,
      status_code: statusCode,
      error_type: error.name,
      code: error.code,
    });
  return res.status(statusCode).json({ status: 'error', message, data });
}
