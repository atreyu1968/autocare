export type HealthStatus =
  | "EXCELLENT"
  | "GOOD"
  | "ATTENTION"
  | "RISK"
  | "CRITICAL";

export interface HealthSnapshot {
  score: number;
  status: HealthStatus;
  generatedAt: Date;
}

export interface VehicleHealthScore {
  vehicleId: string;
  score: number;
  factors: {
    maintenance: number;
    obd: number;
    battery: number;
    documents: number;
  };
  updatedAt: string;
}
