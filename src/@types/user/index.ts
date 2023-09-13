import { EAccountType } from "../../modules/users/config/user.enum";

export interface ILoggedUser {
  id: number;
  username: string;
  fullName: string;
  accountType: EAccountType;
  permissions: string[];
}
export interface IUser {
  id: number;
  username: string;
}

export interface IJwtPayload {
  id: number;
  username: string;
}
