import { Router } from 'express';
import { passportController } from './passport.controller';

const router = Router();

router.get('/:vehicleId', (req, res) => passportController.generate(req, res));

export default router;
