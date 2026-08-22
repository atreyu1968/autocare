export type HealthInput = {
  maintenanceScore: number;
  historyScore: number;
  failuresScore: number;
  mileageScore: number;
  ageScore: number;
  documentationScore: number;
};

export function calculateHealthScore(input: HealthInput) {
  const score =
    input.maintenanceScore * 0.30 +
    input.historyScore * 0.15 +
    input.failuresScore * 0.15 +
    input.mileageScore * 0.15 +
    input.ageScore * 0.15 +
    input.documentationScore * 0.10;

  const rounded = Math.round(score);

  return {
    score: rounded,
    status:
      rounded >= 90
        ? "EXCELLENT"
        : rounded >= 75
          ? "GOOD"
          : rounded >= 60
            ? "ATTENTION"
            : rounded >= 40
              ? "RISK"
              : "CRITICAL"
  };
}
