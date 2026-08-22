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
