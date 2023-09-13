import { ConsoleUtils } from "../utils/console.utils";
import { User } from "../databases/entities";
import { Repository } from "../databases/repositories";
import { env } from "../env";
import { EAccountType, EUserStatus } from "../modules/users/config/user.enum";
import { HashUtils } from "../modules/users/utils/hash.utils";

export class AppStartup {
  static logger = new ConsoleUtils(AppStartup.name);

  static async init() {
    await Promise.all([AppStartup.createAdminUser()]);
  }

  static async createAdminUser(): Promise<void> {
    try {
      AppStartup.logger.info("***************createAdminUser************");
      const username = env.rootAccount!;
      const user = await Repository.User.findOne({ where: { username } });
      if (user) {
        AppStartup.logger.warn(`Username ${username} already exist.`);
        return;
      }

      const entity = new User();
      entity.username = username;
      entity.password = await HashUtils.encrypt(env.rootPassword!);
      entity.email = env.rootEmail!;
      entity.fullName = "Administrator";
      entity.status = EUserStatus.ACTIVE;
      entity.accountType = EAccountType.SUPER_ADMIN;
      await Repository.User.save(entity);
      AppStartup.logger.success(`Create user ${username} success.`);
    } catch (error) {
      AppStartup.logger.error(`Create user error.`, error);
    } finally {
      AppStartup.logger.info("***************************");
    }
  }
}
