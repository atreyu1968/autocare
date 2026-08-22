export interface VehicleAIContext {
  vehicleId: string;
  documents: unknown[];
  maintenance: unknown[];
  diagnostics: unknown[];
  alerts: unknown[];
}

export class AIContextService {
  buildContext(data: VehicleAIContext) {
    return {
      ...data,
      generatedAt: new Date().toISOString(),
    };
  }

  summarize(context: VehicleAIContext) {
    return {
      vehicleId: context.vehicleId,
      sources: [
        'documents',
        'maintenance',
        'diagnostics',
        'alerts'
      ],
      readyForAI: true,
    };
  }
}

export const aiContextService = new AIContextService();
