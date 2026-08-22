import { Router } from 'express';
import { obdController } from './obd.controller';

const router = Router();

router.post('/analyze', (req, res) => obdController.analyze(req, res));

export default router;
