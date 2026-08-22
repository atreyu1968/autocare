import { PrismaClient, CriticalLevel, FuelType, TimingSystem, UserRole, VehicleSystem } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function upsertRule(engineId: string, rule: {
  code: string;
  name: string;
  system: VehicleSystem;
  triggerKm?: number | null;
  triggerMonths?: number | null;
  criticalLevel: CriticalLevel;
  procedureNotes?: string;
  warning?: string;
  fluidSpecification?: string;
  fluidQuantityL?: number;
  torqueMinNm?: number;
  torqueMaxNm?: number;
  partReference?: string;
}) {
  return prisma.maintenanceRuleTemplate.upsert({
    where: { engineId_code: { engineId, code: rule.code } },
    update: rule,
    create: { engineId, ...rule }
  });
}

async function main() {
  const adminEmail = process.env.AUTOCARE_ADMIN_EMAIL ?? "admin@autocare.local";
  const adminPassword = process.env.AUTOCARE_ADMIN_PASSWORD ?? "ChangeMeNow";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: UserRole.ADMIN },
    create: { email: adminEmail, passwordHash, role: UserRole.ADMIN, name: "Administrador AutoCare" }
  });

  const nissan = await prisma.manufacturer.upsert({
    where: { name: "Nissan" },
    update: {},
    create: { name: "Nissan" }
  });

  const qashqai = await prisma.vehicleModel.upsert({
    where: { manufacturerId_name: { manufacturerId: nissan.id, name: "Qashqai" } },
    update: {},
    create: { manufacturerId: nissan.id, name: "Qashqai" }
  });

  const j10 = await prisma.vehicleGeneration.upsert({
    where: { vehicleModelId_code: { vehicleModelId: qashqai.id, code: "J10" } },
    update: { name: "1ª generación" },
    create: { vehicleModelId: qashqai.id, code: "J10", name: "1ª generación", startYear: 2007 }
  });

  const mr20de = await prisma.engineTemplate.upsert({
    where: { generationId_code: { generationId: j10.id, code: "MR20DE" } },
    update: {},
    create: {
      generationId: j10.id,
      code: "MR20DE",
      commercialName: "2.0 16V gasolina",
      fuelType: FuelType.PETROL,
      displacementCc: 1997,
      powerKw: 104,
      powerHp: 141,
      torqueNm: 196,
      turbo: false,
      dpf: false,
      timingSystem: TimingSystem.CHAIN,
      oilSpecification: "5W-40 ACEA A3/B4",
      oilCapacityL: 4.4,
      compressionStandardBar: 15.6,
      compressionMinimumBar: 11.9,
      compressionMaxVariance: 1.0,
      environmentalBadge: "C"
    }
  });

  const m9r = await prisma.engineTemplate.upsert({
    where: { generationId_code: { generationId: j10.id, code: "M9R" } },
    update: {},
    create: {
      generationId: j10.id,
      code: "M9R",
      commercialName: "2.0 dCi",
      fuelType: FuelType.DIESEL,
      displacementCc: 1995,
      powerKw: 110,
      powerHp: 150,
      torqueNm: 320,
      turbo: true,
      dpf: true,
      timingSystem: TimingSystem.CHAIN,
      oilSpecification: "5W-30 ACEA C4 / Renault RN0720",
      oilCapacityL: 7.4,
      compressionStandardBar: 22.0,
      compressionMinimumBar: 20.0,
      environmentalBadge: "B"
    }
  });

  const mrRules = [
    { code: "PRE_ITV", name: "Inspección integral anual Pre-ITV", system: VehicleSystem.BODY, triggerKm: null, triggerMonths: 12, criticalLevel: CriticalLevel.HIGH },
    { code: "OIL_CHANGE", name: "Cambio de aceite motor y filtro", system: VehicleSystem.LUBRICATION, triggerKm: 15000, triggerMonths: 12, criticalLevel: CriticalLevel.HIGH, fluidSpecification: "5W-40 ACEA A3/B4", fluidQuantityL: 4.4, torqueMinNm: 34, torqueMaxNm: 34 },
    { code: "ENGINE_FLUSH", name: "Limpieza interna de motor (Engine Flush)", system: VehicleSystem.LUBRICATION, triggerKm: 15000, triggerMonths: 12, criticalLevel: CriticalLevel.LOW },
    { code: "CERATEC", name: "Aditivo antifricción cerámico", system: VehicleSystem.LUBRICATION, triggerKm: 15000, triggerMonths: 12, criticalLevel: CriticalLevel.LOW, fluidQuantityL: 0.3 },
    { code: "INJECTOR_CLEANER", name: "Limpiador de inyectores gasolina", system: VehicleSystem.FUEL, triggerKm: 15000, triggerMonths: 12, criticalLevel: CriticalLevel.LOW },
    { code: "CABIN_FILTER", name: "Filtro de habitáculo / polen", system: VehicleSystem.HVAC, triggerKm: 15000, triggerMonths: 12, criticalLevel: CriticalLevel.MEDIUM },
    { code: "DECARBONIZATION", name: "Descarbonización química de segmentos", system: VehicleSystem.ENGINE, triggerKm: 30000, triggerMonths: 24, criticalLevel: CriticalLevel.MEDIUM },
    { code: "PCV", name: "Inspección y limpieza de válvula PCV", system: VehicleSystem.EMISSIONS, triggerKm: 30000, triggerMonths: 24, criticalLevel: CriticalLevel.MEDIUM },
    { code: "BRAKE_FLUID", name: "Sustitución líquido de frenos/embrague", system: VehicleSystem.BRAKES, triggerKm: 30000, triggerMonths: 24, criticalLevel: CriticalLevel.HIGH, fluidSpecification: "DOT 4", fluidQuantityL: 1.0 },
    { code: "GEARBOX_OIL", name: "Valvulina caja manual", system: VehicleSystem.TRANSMISSION, triggerKm: 60000, triggerMonths: 48, criticalLevel: CriticalLevel.MEDIUM, fluidSpecification: "75W-80 API GL-4", fluidQuantityL: 2.0 },
    { code: "SPARK_PLUGS", name: "Sustitución de bujías de iridio", system: VehicleSystem.IGNITION, triggerKm: 90000, triggerMonths: 72, criticalLevel: CriticalLevel.CRITICAL, partReference: "NGK PLZKAR6A-11", torqueMinNm: 15, torqueMaxNm: 20 },
    { code: "COOLANT", name: "Sustitución y purgado de refrigerante", system: VehicleSystem.COOLING, triggerKm: 100000, triggerMonths: 60, criticalLevel: CriticalLevel.HIGH, fluidSpecification: "Nissan L248/L250 u OAT 50%", fluidQuantityL: 8.2 }
  ];

  const dieselRules = [
    { code: "PRE_ITV", name: "Inspección anual Pre-ITV diésel", system: VehicleSystem.EMISSIONS, triggerKm: null, triggerMonths: 12, criticalLevel: CriticalLevel.HIGH },
    { code: "OIL_CHANGE", name: "Cambio de aceite y filtro", system: VehicleSystem.LUBRICATION, triggerKm: 15000, triggerMonths: 12, criticalLevel: CriticalLevel.HIGH, fluidSpecification: "5W-30 ACEA C4 / RN0720", fluidQuantityL: 7.4, torqueMinNm: 34, torqueMaxNm: 34, warning: "Usar exclusivamente aceite Low SAPS compatible con DPF." },
    { code: "DIESEL_ADDITIVE", name: "Aditivo limpiador DPF/Inyectores", system: VehicleSystem.EMISSIONS, triggerKm: 15000, triggerMonths: 12, criticalLevel: CriticalLevel.MEDIUM },
    { code: "CABIN_FILTER", name: "Filtro de habitáculo / polen", system: VehicleSystem.HVAC, triggerKm: 15000, triggerMonths: 12, criticalLevel: CriticalLevel.MEDIUM },
    { code: "FUEL_FILTER", name: "Sustitución filtro de gasoil", system: VehicleSystem.FUEL, triggerKm: 30000, triggerMonths: 24, criticalLevel: CriticalLevel.CRITICAL, warning: "Purgar correctamente el aire antes del arranque." },
    { code: "AIR_FILTER", name: "Sustitución filtro de aire motor", system: VehicleSystem.INTAKE, triggerKm: 30000, triggerMonths: 24, criticalLevel: CriticalLevel.MEDIUM },
    { code: "BRAKE_FLUID", name: "Sustitución líquido de frenos/embrague", system: VehicleSystem.BRAKES, triggerKm: 30000, triggerMonths: 24, criticalLevel: CriticalLevel.HIGH, fluidSpecification: "DOT 4", fluidQuantityL: 1.0 },
    { code: "EGR_CLEANING", name: "Desmontaje y limpieza de válvula EGR", system: VehicleSystem.EMISSIONS, triggerKm: 60000, triggerMonths: 48, criticalLevel: CriticalLevel.HIGH },
    { code: "GEARBOX_OIL", name: "Valvulina caja manual", system: VehicleSystem.TRANSMISSION, triggerKm: 60000, triggerMonths: 48, criticalLevel: CriticalLevel.MEDIUM, fluidSpecification: "75W-80 API GL-4", fluidQuantityL: 2.0 },
    { code: "AUX_BELT", name: "Correa auxiliar Poly-V y tensor", system: VehicleSystem.ENGINE, triggerKm: 60000, triggerMonths: 48, criticalLevel: CriticalLevel.MEDIUM },
    { code: "COOLANT", name: "Sustitución y purgado de refrigerante", system: VehicleSystem.COOLING, triggerKm: 100000, triggerMonths: 60, criticalLevel: CriticalLevel.HIGH, fluidSpecification: "Nissan L248/L250 u OAT 50%", fluidQuantityL: 8.5 },
    { code: "GLOW_PLUGS", name: "Comprobación/sustitución de calentadores", system: VehicleSystem.IGNITION, triggerKm: 100000, triggerMonths: 84, criticalLevel: CriticalLevel.MEDIUM, warning: "Extraer con el motor caliente y con máxima precaución para evitar rotura." },
    { code: "METAL_LUBE", name: "Tratamiento antifricción", system: VehicleSystem.LUBRICATION, triggerKm: 100000, triggerMonths: null, criticalLevel: CriticalLevel.MEDIUM, fluidQuantityL: 0.25 }
  ];

  for (const rule of mrRules) await upsertRule(mr20de.id, rule);
  for (const rule of dieselRules) await upsertRule(m9r.id, rule);

  console.log("[AutoCare seed] Nissan Qashqai J10 MR20DE y M9R cargados.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
