import { Request, Response } from 'express';
import { aiService } from './ai.service';

export class AiController {
  async ask(req: Request, res: Response) {
    const vehicleId = String(req.params.vehicleId);
    const question = String(req.body.question || '');

    res.json(await aiService.answer(vehicleId, question));
  }
}

export const aiController = new AiController();
