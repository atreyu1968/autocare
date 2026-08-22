import { Request, Response } from "express";
import { getVehicle, listVehicles, updateOdometer } from "./vehicle.service";

export async function myVehicles(req: Request, res: Response) {
  const userId = (req as any).user.id;
  res.json(await listVehicles(userId));
}

export async function vehicleDetail(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const vehicle = await getVehicle(req.params.id, userId);

  if (!vehicle) return res.status(404).json({ message: "Vehículo no encontrado" });
  res.json(vehicle);
}

export async function changeOdometer(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const km = Number(req.body.km);
  res.json(await updateOdometer(req.params.id, userId, km));
}
