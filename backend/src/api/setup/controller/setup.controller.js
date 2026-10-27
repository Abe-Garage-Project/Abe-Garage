import { asyncHandler } from '../../../utils/async-handler.js';
import { respond } from '../../../utils/respond.js';
import { healthService } from '../service/setup.service.js';

export const healthController = asyncHandler(async (req, res) => {
  const readiness = await healthService();
  return respond(res, readiness, 'Service ready');
});
