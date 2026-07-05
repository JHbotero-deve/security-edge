import { UserService } from "./UserService";

const userService = new UserService();

export class UserController {
  static async list(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
  }
}
