import { Request, Response } from 'express';
import { documentsService } from './documents.service';

export class DocumentsController {
  async list(req: Request, res: Response) {
    const vehicleId = String(req.params.vehicleId);
    res.json(await documentsService.list(vehicleId));
  }
}

export const documentsController = new DocumentsController();
