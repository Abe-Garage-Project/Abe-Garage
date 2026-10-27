export function respond(res, data = null, message = 'Request successful', statusCode = 200) {
  return res.status(statusCode).json({ status: 'success', message, data });
}
