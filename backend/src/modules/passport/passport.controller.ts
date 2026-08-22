import { Request, Response } from 'express';
import { passportService } from './passport.service';

export class PassportController {
  async generate(req: Request, res: Response) {
    const vehicleId = String(req.params.vehicleId);
    const passport = await passportService.generate(vehicleId);
    res.json(passport);
  }
}

export const passportController = new PassportController();
