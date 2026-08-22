export interface VehiclePassportData {
  vehicleId: string;
  brand?: string;
  model?: string;
  engine?: string;
  mileage?: number;
  healthScore?: number;
  maintenanceCount?: number;
  documentCount?: number;
}

export interface PassportSection {
  title: string;
  data: Record<string, unknown>;
}
