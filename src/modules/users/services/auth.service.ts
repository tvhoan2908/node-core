import { Repository } from "../../../databases/repositories";
import { UnauthorizedException } from "../../../exceptions";
import { EUserStatus } from "../config/user.enum";
import { ILoginRequest } from "../requests";
import { ILoginResponse } from "../resources/auth";
import { AuthUtils } from "../utils/authUtils";
import { HashUtils } from "../utils/hash.utils";

export class AuthService {
  static async login(request: ILoginRequest): Promise<ILoginResponse> {
    const user = await Repository.User.findOneBy({ username: request.username });
    if (!user) throw new UnauthorizedException("username does not exist");
    if (user.status != EUserStatus.ACTIVE) throw new UnauthorizedException("user is disabled;");

    const isValidPassword = await HashUtils.compare(request.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException("password is invalid.");

    return {
      token: AuthUtils.generateToken(user),
    };
  }
}
