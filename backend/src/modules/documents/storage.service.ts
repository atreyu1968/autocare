import path from 'path';

export class StorageService {
  getVehicleStoragePath(vehicleId: string) {
    return path.join('storage', 'vehicles', vehicleId, 'documents');
  }

  getUploadPath(vehicleId: string, filename: string) {
    return path.join(this.getVehicleStoragePath(vehicleId), filename);
  }
}

export const storageService = new StorageService();
