import { Request, Response } from 'express';
import { mobileService } from './mobile.service';

export class MobileController {
  async status(req: Request, res: Response) {
    const vehicleId = String(req.params.vehicleId);
    res.json(await mobileService.getVehicleStatus(vehicleId));
  }
}

export const mobileController = new MobileController();
