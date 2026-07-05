import { UserRepository } from "../../repositories/UserRepository";

const userRepo = new UserRepository();

export class AuthService {
  async authenticate(email, password) {
    const user = await userRepo.findByEmail(email); // Método que debes añadir en UserRepository
    if (!user || user.password !== password)
      throw new Error("Credenciales inválidas");
    return { id: user.id, email: user.email };
  }
}
