import { Request, Response } from 'express';
import { documentsService } from './documents.service';

export class DocumentsController {
  async list(req: Request, res: Response) {
    const vehicleId = String(req.params.vehicleId);
    res.json(await documentsService.list(vehicleId));
  }

  async prepareUpload(req: Request, res: Response) {
    const { vehicleId, filename, mimeType } = req.body;

    res.json(
      await documentsService.prepareUpload(
        vehicleId,
        filename,
        mimeType
      )
    );
  }
}

export const documentsController = new DocumentsController();
