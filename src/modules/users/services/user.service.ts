import { User } from "../../../databases/entities";
import { Repository } from "../../../databases/repositories";

export class UserService {
  static async getUserById(id: number): Promise<User | null> {
    return Repository.User.findOne({ where: { id }, relations: { roles: { role: { rolePermissions: true } } } });
  }
}
