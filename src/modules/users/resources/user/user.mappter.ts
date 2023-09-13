import { ILoggedUser } from "../../../../@types";
import { User } from "../../../../databases/entities";

export class UserMapper {
  static toLoggedInDTO(request: User | null): ILoggedUser | null {
    if (!request) return null;

    return {
      id: request.id,
      username: request.username,
      fullName: request.fullName,
      accountType: request.accountType,
      permissions: [],
    };
  }
}
