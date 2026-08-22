import { Request, Response } from 'express';
import { alertsService } from './alerts.service';

export class AlertsController {
  async vehicleAlerts(req: Request, res: Response) {
    const vehicleId = String(req.params.vehicleId);
    res.json(await alertsService.getVehicleAlerts(vehicleId));
  }
}

export const alertsController = new AlertsController();
