import chalk from "chalk";
import { DateUtils } from "./date.utils";
export class ConsoleUtils {
  private fileName: string;
  private readonly logger = console.log;
  constructor(fileName: string) {
    this.fileName = fileName;
  }

  success(message: unknown, ...optionalParams: unknown[]): void {
    this.logger(
      chalk.green(`${DateUtils.getCurrentDate("YYYY-MM-DD HH:mm:ss")} [${this.fileName}]: ${message}`),
      ...optionalParams,
    );
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    this.logger(
      chalk.red(`${DateUtils.getCurrentDate("YYYY-MM-DD HH:mm:ss")} [${this.fileName}]: ${message}`),
      ...optionalParams,
    );
  }

  info(message: unknown, ...optionalParams: unknown[]): void {
    this.logger(
      chalk.blueBright(`${DateUtils.getCurrentDate("YYYY-MM-DD HH:mm:ss")} [${this.fileName}]: ${message}`),
      ...optionalParams,
    );
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    this.logger(
      chalk.yellow(`${DateUtils.getCurrentDate("YYYY-MM-DD HH:mm:ss")} [${this.fileName}]: ${message}`),
      ...optionalParams,
    );
  }
}
