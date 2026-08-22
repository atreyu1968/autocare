import { VehicleDocumentMetadata } from './documents.types';
import { storageService } from './storage.service';

export class DocumentsService {
  async createMetadata(data: VehicleDocumentMetadata) {
    return {
      ...data,
      storagePath: storageService.getUploadPath(data.vehicleId, data.filename),
      createdAt: new Date().toISOString(),
    };
  }

  async prepareUpload(vehicleId: string, filename: string, mimeType: string) {
    return {
      vehicleId,
      filename,
      mimeType,
      storagePath: storageService.getUploadPath(vehicleId, filename),
      status: 'READY',
    };
  }

  async list(vehicleId: string) {
    return {
      vehicleId,
      documents: [],
    };
  }
}

export const documentsService = new DocumentsService();
