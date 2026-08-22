import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);

  // Prisma integration is connected in the next backend persistence step.
  const passwordHash = await bcrypt.hash(data.password, 12);

  res.status(201).json({
    message: "Usuario preparado correctamente",
    user: {
      email: data.email,
      name: data.name ?? null,
      passwordHash
    }
  });
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);

  const token = jwt.sign(
    { email: data.email },
    process.env.JWT_SECRET ?? "autocare-development-secret",
    { expiresIn: "15m" }
  );

  res.json({
    accessToken: token
  });
}
