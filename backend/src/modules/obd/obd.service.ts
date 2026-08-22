import { OBDRecord } from './obd.types';

export class OBDService {
  parseRecord(record: OBDRecord) {
    return {
      ...record,
      createdAt: record.createdAt || new Date().toISOString()
    };
  }

  analyzeBatteryVoltage(voltage: number) {
    if (voltage < 12.2) {
      return {
        alert: true,
        message: 'Posible degradación de batería'
      };
    }

    return {
      alert: false,
      message: 'Voltaje normal'
    };
  }
}

export const obdService = new OBDService();
