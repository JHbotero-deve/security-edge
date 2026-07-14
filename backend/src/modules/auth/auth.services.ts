import { AuthRepository } from "./auth.repository";
import { AppError } from "../../utils/appError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRepository = new AuthRepository();

export const registerService = async (data: any) => {
  const existingUser = await authRepository.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError("El correo electrónico ya está registrado", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await authRepository.create({
    ...data,
    password: hashedPassword,
  });

  return { id: user.id, email: user.email, name: user.name };
};

export const loginService = async (data: any) => {
  const user = await authRepository.findOne({ email: data.email });
  if (!user) {
    throw new AppError("Credenciales inválidas", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Credenciales inválidas", 401);
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });

  return { token, user: { id: user.id, email: user.email, role: user.role } };
};
