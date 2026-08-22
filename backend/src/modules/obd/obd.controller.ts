import { Request, Response } from 'express';
import { obdService } from './obd.service';

export class ObdController {
  async analyze(req: Request, res: Response) {
    const result = await obdService.analyze(req.body);
    res.json(result);
  }
}

export const obdController = new ObdController();
