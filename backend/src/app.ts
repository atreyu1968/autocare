import cors from "cors";
import express from "express";
import helmet from "helmet";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "autocare-api",
    version: "0.1.0",
    timestamp: new Date().toISOString()
  });
});

app.use((_req, res) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});
