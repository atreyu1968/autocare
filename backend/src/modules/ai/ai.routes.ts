import { Router } from 'express';
import { aiController } from './ai.controller';

const router = Router();

router.post('/:vehicleId/ask', (req, res) => aiController.ask(req, res));

export default router;
