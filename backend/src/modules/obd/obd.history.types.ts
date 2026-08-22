export interface OBDHistoryRecord {
  vehicleId: string;
  timestamp: string;
  mileage?: number;
  dtcCodes: string[];
  sensors: Record<string, number | string>;
  batteryVoltage?: number;
}

export type DiagnosticType = 'DTC' | 'SENSOR' | 'BATTERY';
