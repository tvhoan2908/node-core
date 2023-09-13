import express, { Express } from "express";
import { env } from "./env";
import chalk from "chalk";
import { AppDataSource } from "./config/data-source";
import routes from "./routes";
import bodyParser from "body-parser";
import { AppStartup } from "./startup";
import { morganMiddleware } from "./middlewares";
import { errorHandler } from "./exceptions";

const app: Express = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Datasource has been initialized!");
    AppStartup.init();
  })
  .catch((err) => console.error("Error during datasource initialization::", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morganMiddleware);
app.use("/", routes);

app.use(errorHandler);

app.listen(env.port, () => console.log(chalk.yellow(`Server running at http://localhost:${env.port}`)));
