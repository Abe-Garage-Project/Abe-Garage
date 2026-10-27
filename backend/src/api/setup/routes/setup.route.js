import { Router } from 'express';
import { healthController } from '../controller/setup.controller.js';

const router = Router();

// Mounted at /api.
// Planned endpoints (add handlers when implementing each task):
// BE-047  POST  /install
// BE-048  GET   /health

router.get('/health', healthController);

// Import your controllers and validation here when the feature is ready.
// Write local paths only; do not repeat /api or the resource prefix.

export default router;
