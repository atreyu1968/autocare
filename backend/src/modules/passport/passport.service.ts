import { VehiclePassportData } from './passport.types';

export class PassportService {
  generate(data: VehiclePassportData) {
    return {
      generatedAt: new Date().toISOString(),
      vehicle: data,
      sections: [
        {
          title: 'Estado del vehículo',
          data: {
            healthScore: data.healthScore ?? null,
          },
        },
        {
          title: 'Historial',
          data: {
            maintenanceCount: data.maintenanceCount ?? 0,
            documentCount: data.documentCount ?? 0,
          },
        },
      ],
    };
  }
}

export const passportService = new PassportService();
