export type AlertType =
  | 'MAINTENANCE'
  | 'ITV'
  | 'INSURANCE'
  | 'BATTERY'
  | 'DOCUMENTATION';

export type AlertPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface VehicleAlert {
  vehicleId: string;
  type: AlertType;
  priority: AlertPriority;
  message: string;
  dueDate?: string;
  status: 'PENDING' | 'COMPLETED';
}
