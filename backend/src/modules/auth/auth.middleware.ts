import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./auth.service.js";

export interface AuthRequest extends Request {
  user?: unknown;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  try {
    req.user = verifyAccessToken(header.substring(7));
    next();
  } catch {
    return res.status(401).json({ message: "Token no válido" });
  }
}
