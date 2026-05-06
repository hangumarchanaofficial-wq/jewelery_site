import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { ENV } from "../config/env";

export const UserService = {
  async register(firstName: string, lastName: string, email: string, password: string) {
    const existing = await UserModel.findByEmail(email);
    if (existing) throw new Error("Email already registered");
    const hashed = await bcrypt.hash(password, 12);
    const user = await UserModel.create(firstName, lastName, email, hashed);
    const token = jwt.sign({ userId: user.id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });
    return { user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email }, token };
  },

  async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = jwt.sign({ userId: user.id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });
    return { user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email }, token };
  },

  async getProfile(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  },
};
