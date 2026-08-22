import { VehicleDocumentMetadata } from './documents.types';

export class DocumentsService {
  async createMetadata(data: VehicleDocumentMetadata) {
    return {
      ...data,
      createdAt: new Date().toISOString(),
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
