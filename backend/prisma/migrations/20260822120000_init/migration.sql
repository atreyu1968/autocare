CREATE TYPE "UserRole" AS ENUM ('OWNER', 'MECHANIC', 'ADMIN');
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'HYBRID', 'PHEV', 'ELECTRIC', 'LPG');
CREATE TYPE "TimingSystem" AS ENUM ('CHAIN', 'BELT', 'GEARS', 'NONE');
CREATE TYPE "CriticalLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE "ChecklistType" AS ENUM ('REPLACE', 'INSPECT', 'CHECK', 'CLEAN', 'ADDITIVE');
CREATE TYPE "VehicleSystem" AS ENUM ('ENGINE', 'LUBRICATION', 'COOLING', 'INTAKE', 'FUEL', 'IGNITION', 'EMISSIONS', 'TURBO', 'TRANSMISSION', 'BRAKES', 'SUSPENSION', 'STEERING', 'ELECTRICAL', 'HVAC', 'BODY', 'TYRES');

CREATE TABLE "User" (
  "id" UUID NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'OWNER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "Manufacturer" (
  "id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Manufacturer_name_key" ON "Manufacturer"("name");

CREATE TABLE "VehicleModel" (
  "id" UUID NOT NULL,
  "manufacturerId" UUID NOT NULL,
  "name" TEXT NOT NULL,
  CONSTRAINT "VehicleModel_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "VehicleModel_manufacturerId_name_key" ON "VehicleModel"("manufacturerId", "name");

CREATE TABLE "VehicleGeneration" (
  "id" UUID NOT NULL,
  "vehicleModelId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "name" TEXT,
  "startYear" INTEGER,
  "endYear" INTEGER,
  CONSTRAINT "VehicleGeneration_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "VehicleGeneration_vehicleModelId_code_key" ON "VehicleGeneration"("vehicleModelId", "code");

CREATE TABLE "EngineTemplate" (
  "id" UUID NOT NULL,
  "generationId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "commercialName" TEXT NOT NULL,
  "fuelType" "FuelType" NOT NULL,
  "displacementCc" INTEGER,
  "powerKw" INTEGER,
  "powerHp" INTEGER,
  "torqueNm" INTEGER,
  "turbo" BOOLEAN NOT NULL DEFAULT false,
  "dpf" BOOLEAN NOT NULL DEFAULT false,
  "timingSystem" "TimingSystem",
  "oilSpecification" TEXT,
  "oilCapacityL" DOUBLE PRECISION,
  "compressionStandardBar" DOUBLE PRECISION,
  "compressionMinimumBar" DOUBLE PRECISION,
  "compressionMaxVariance" DOUBLE PRECISION,
  "environmentalBadge" TEXT,
  CONSTRAINT "EngineTemplate_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "EngineTemplate_generationId_code_key" ON "EngineTemplate"("generationId", "code");

CREATE TABLE "MaintenanceRuleTemplate" (
  "id" UUID NOT NULL,
  "engineId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "system" "VehicleSystem" NOT NULL,
  "triggerKm" INTEGER,
  "triggerMonths" INTEGER,
  "criticalLevel" "CriticalLevel" NOT NULL,
  "procedureNotes" TEXT,
  "warning" TEXT,
  "fluidSpecification" TEXT,
  "fluidQuantityL" DOUBLE PRECISION,
  "torqueMinNm" DOUBLE PRECISION,
  "torqueMaxNm" DOUBLE PRECISION,
  "partReference" TEXT,
  CONSTRAINT "MaintenanceRuleTemplate_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "MaintenanceRuleTemplate_engineId_code_key" ON "MaintenanceRuleTemplate"("engineId", "code");

CREATE TABLE "MaintenancePackageTemplate" (
  "id" UUID NOT NULL,
  "engineId" UUID NOT NULL,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "triggerKm" INTEGER,
  "triggerMonths" INTEGER,
  CONSTRAINT "MaintenancePackageTemplate_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "MaintenancePackageTemplate_engineId_code_key" ON "MaintenancePackageTemplate"("engineId", "code");

CREATE TABLE "MaintenancePackageItem" (
  "id" UUID NOT NULL,
  "packageId" UUID NOT NULL,
  "ruleId" UUID,
  "description" TEXT NOT NULL,
  "type" "ChecklistType" NOT NULL,
  "mandatory" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "MaintenancePackageItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Vehicle" (
  "id" UUID NOT NULL,
  "ownerId" UUID NOT NULL,
  "engineId" UUID NOT NULL,
  "vin" TEXT,
  "registrationDate" TIMESTAMP(3) NOT NULL,
  "currentOdometerKm" INTEGER NOT NULL DEFAULT 0,
  "nextItvDate" TIMESTAMP(3),
  "timingChainReplaced" BOOLEAN NOT NULL DEFAULT false,
  "timingChainReplacedKm" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Vehicle_vin_key" ON "Vehicle"("vin");

CREATE TABLE "MaintenanceHistory" (
  "id" UUID NOT NULL,
  "vehicleId" UUID NOT NULL,
  "ruleId" UUID NOT NULL,
  "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "odometerKm" INTEGER NOT NULL,
  "cost" DECIMAL(10,2),
  "notes" TEXT,
  CONSTRAINT "MaintenanceHistory_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "MaintenanceHistory_vehicleId_performedAt_idx" ON "MaintenanceHistory"("vehicleId", "performedAt");
CREATE INDEX "MaintenanceHistory_vehicleId_ruleId_idx" ON "MaintenanceHistory"("vehicleId", "ruleId");

CREATE TABLE "DiagnosticRecord" (
  "id" UUID NOT NULL,
  "vehicleId" UUID NOT NULL,
  "type" TEXT NOT NULL,
  "data" JSONB NOT NULL,
  "odometerKm" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DiagnosticRecord_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "DiagnosticRecord_vehicleId_createdAt_idx" ON "DiagnosticRecord"("vehicleId", "createdAt");

CREATE TABLE "MaintenanceCost" (
  "id" UUID NOT NULL,
  "vehicleId" UUID NOT NULL,
  "description" TEXT NOT NULL,
  "parts" DECIMAL(10,2),
  "labor" DECIMAL(10,2),
  "total" DECIMAL(10,2),
  "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MaintenanceCost_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "MaintenanceCost_vehicleId_date_idx" ON "MaintenanceCost"("vehicleId", "date");

ALTER TABLE "VehicleModel" ADD CONSTRAINT "VehicleModel_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "VehicleGeneration" ADD CONSTRAINT "VehicleGeneration_vehicleModelId_fkey" FOREIGN KEY ("vehicleModelId") REFERENCES "VehicleModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EngineTemplate" ADD CONSTRAINT "EngineTemplate_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "VehicleGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MaintenanceRuleTemplate" ADD CONSTRAINT "MaintenanceRuleTemplate_engineId_fkey" FOREIGN KEY ("engineId") REFERENCES "EngineTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MaintenancePackageTemplate" ADD CONSTRAINT "MaintenancePackageTemplate_engineId_fkey" FOREIGN KEY ("engineId") REFERENCES "EngineTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MaintenancePackageItem" ADD CONSTRAINT "MaintenancePackageItem_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "MaintenancePackageTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MaintenancePackageItem" ADD CONSTRAINT "MaintenancePackageItem_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "MaintenanceRuleTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_engineId_fkey" FOREIGN KEY ("engineId") REFERENCES "EngineTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "MaintenanceHistory" ADD CONSTRAINT "MaintenanceHistory_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MaintenanceHistory" ADD CONSTRAINT "MaintenanceHistory_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "MaintenanceRuleTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DiagnosticRecord" ADD CONSTRAINT "DiagnosticRecord_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MaintenanceCost" ADD CONSTRAINT "MaintenanceCost_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
