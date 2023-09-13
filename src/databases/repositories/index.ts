import { AppDataSource } from "../../config";
import { User } from "../entities";

export const Repository = {
  User: AppDataSource.getRepository(User),
};
