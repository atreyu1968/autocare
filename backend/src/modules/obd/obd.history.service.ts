import { OBDHistoryRecord } from './obd.history.types';

export class OBDHistoryService {
  private records: OBDHistoryRecord[] = [];

  save(record: OBDHistoryRecord) {
    this.records.push(record);
    return record;
  }

  findByVehicle(vehicleId: string) {
    return this.records.filter(r => r.vehicleId === vehicleId);
  }

  batteryTrend(vehicleId: string) {
    return this.findByVehicle(vehicleId)
      .filter(r => r.batteryVoltage !== undefined)
      .map(r => ({
        date: r.timestamp,
        voltage: r.batteryVoltage
      }));
  }
}

export const obdHistoryService = new OBDHistoryService();
