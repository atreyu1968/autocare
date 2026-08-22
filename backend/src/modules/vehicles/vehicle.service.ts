import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listVehicles(ownerId: string) {
  return prisma.vehicle.findMany({
    where: { ownerId },
    include: {
      engine: {
        include: {
          generation: {
            include: { vehicleModel: { include: { manufacturer: true } } }
          }
        }
      }
    }
  });
}

export async function getVehicle(id: string, ownerId: string) {
  return prisma.vehicle.findFirst({
    where: { id, ownerId },
    include: { engine: { include: { rules: true } } }
  });
}

export async function updateOdometer(id: string, ownerId: string, km: number) {
  return prisma.vehicle.updateMany({
    where: { id, ownerId },
    data: { currentOdometerKm: km }
  });
}
