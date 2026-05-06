import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../middleware/auth";

export const UserController = {
  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ error: "All fields required" }); return;
      }
      const result = await UserService.register(firstName, lastName, email, password);
      res.status(201).json(result);
    } catch (e: unknown) {
      res.status(400).json({ error: e instanceof Error ? e.message : "Registration failed" });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.json(result);
    } catch (e: unknown) {
      res.status(401).json({ error: e instanceof Error ? e.message : "Login failed" });
    }
  },

  async profile(req: AuthRequest, res: Response) {
    try {
      const user = await UserService.getProfile(req.userId!);
      res.json(user);
    } catch (e: unknown) {
      res.status(404).json({ error: e instanceof Error ? e.message : "Not found" });
    }
  },
};
