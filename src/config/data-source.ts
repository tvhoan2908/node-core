import { DataSource } from "typeorm";
import { env } from "../env";
import { Module, Permission, Role, RolePermission, User, UserRole } from "../databases/entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  logging: env.isDevelopment,
  synchronize: false,
  replication: {
    master: {
      host: env.db.master.host,
      port: env.db.master.port,
      username: env.db.master.username,
      password: env.db.master.password,
      database: env.db.master.dbName,
    },
    slaves: [
      {
        host: env.db.firstSlave.host,
        port: env.db.firstSlave.port,
        username: env.db.firstSlave.username,
        password: env.db.firstSlave.password,
        database: env.db.firstSlave.dbName,
      },
    ],
  },
  migrations: ["build/databases/migrations/**/*{.ts,.js}"],
  migrationsTableName: "migrations",
  maxQueryExecutionTime: 2000,
  entities: [User, Role, Module, UserRole, Permission, RolePermission],
});
