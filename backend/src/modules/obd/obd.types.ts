export type OBDDataType = 'DTC' | 'SENSOR' | 'BATTERY';

export interface OBDRecord {
  vehicleId: string;
  type: OBDDataType;
  code?: string;
  value?: number;
  unit?: string;
  createdAt: string;
}

export interface DTCError {
  code: string;
  description?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}
