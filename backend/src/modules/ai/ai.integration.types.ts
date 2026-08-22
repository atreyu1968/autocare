export interface VehicleKnowledgeContext {
  vehicleId: string;
  maintenanceHistory: unknown[];
  documents: unknown[];
  obdRecords: unknown[];
  alerts: unknown[];
}

export interface AIRecommendation {
  vehicleId: string;
  message: string;
  reasons: string[];
  confidence: number;
}
