import { MobileVehicleStatus } from './mobile.types';

export class MobileService {
  async getVehicleStatus(vehicleId: string): Promise<MobileVehicleStatus> {
    return {
      vehicleId,
      healthScore: 0,
      status: 'UNKNOWN',
      alerts: 0,
    };
  }
}

export const mobileService = new MobileService();
