export interface VehicleKnowledgeItem {
  vehicleId: string;
  source: 'MAINTENANCE' | 'DOCUMENT' | 'OBD' | 'USER';
  content: string;
  createdAt: Date;
}

export interface AIRecommendation {
  vehicleId: string;
  recommendation: string;
  confidence: number;
}
