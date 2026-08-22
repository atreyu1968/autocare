import { Router } from 'express';
import { documentsController } from './documents.controller';

const router = Router();

router.get('/vehicles/:vehicleId/documents', (req, res) =>
  documentsController.list(req, res)
);

router.post('/documents/upload/prepare', (req, res) =>
  documentsController.prepareUpload(req, res)
);

export default router;
