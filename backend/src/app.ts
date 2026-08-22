import cors from "cors";
import express from "express";
import helmet from "helmet";
import authRouter from "./modules/auth/router.js";
import vehicleRouter from "./modules/vehicles/vehicle.routes.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "autocare-api",
    version: "0.3.0",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRouter);
app.use("/api/vehicles", vehicleRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});
