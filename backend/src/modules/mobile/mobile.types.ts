export interface MobileVehicleStatus {
  vehicleId: string;
  healthScore: number;
  status: string;
  nextMaintenance?: string;
  alerts: number;
}

export interface MobileDevice {
  userId: string;
  deviceId: string;
  platform: 'android';
  lastAccess: string;
}
