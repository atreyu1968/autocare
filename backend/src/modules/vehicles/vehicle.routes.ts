import { Router } from "express";
import { authenticateJWT } from "../auth/auth.middleware";
import { changeOdometer, myVehicles, vehicleDetail } from "./vehicle.controller";

const router = Router();

router.use(authenticateJWT);
router.get("/", myVehicles);
router.get("/:id", vehicleDetail);
router.patch("/:id/odometer", changeOdometer);

export default router;
