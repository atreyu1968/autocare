export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface PredictiveAnalysis {
  vehicleId: string;
  riskLevel: RiskLevel;
  factors: string[];
  generatedAt: Date;
}
