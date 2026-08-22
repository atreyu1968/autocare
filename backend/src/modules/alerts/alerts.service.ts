import { VehicleAlert } from './alerts.types';

export class AlertsService {
  generateMaintenanceAlert(vehicleId: string, message: string): VehicleAlert {
    return {
      vehicleId,
      type: 'MAINTENANCE',
      priority: 'MEDIUM',
      message,
      status: 'PENDING'
    };
  }

  generateBatteryAlert(vehicleId: string): VehicleAlert {
    return {
      vehicleId,
      type: 'BATTERY',
      priority: 'HIGH',
      message: 'Comprobar estado de batería del vehículo',
      status: 'PENDING'
    };
  }
}

export const alertsService = new AlertsService();
