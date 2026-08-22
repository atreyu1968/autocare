import { Router } from 'express';
import { alertsController } from './alerts.controller';

const router = Router();

router.get('/:vehicleId', alertsController.vehicleAlerts.bind(alertsController));

export default router;
