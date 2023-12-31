import { appendFile, existsSync, mkdirSync } from "fs";
import { DateUtils } from "./date.utils";
import { env } from "../env";

export class LogUtils {
  static debug(text: string): void {
    this.writeLog(text, "debug");
  }

  static error(text: string): void {
    this.writeLog(text, "error");
  }

  static log(text: string): void {
    this.writeLog(text, "log");
  }

  static logApi(text: string): void {
    this.writeLog(text, "log_api");
  }

  static warn(text: string): void {
    this.writeLog(text, "warn");
  }

  static verbose(text: string): void {
    this.writeLog(text, "verbose");
  }

  static writeLog(text: string, message: string): void {
    const fileName = `${DateUtils.getCurrentDate()}_${message}.log`;
    const logPath = env.logFoler + fileName;
    if (!existsSync(env.logFoler)) {
      mkdirSync(env.logFoler);
    }

    text = text + "\r\n";
    appendFile(logPath, text, (err) => {
      if (err) throw err;
    });
  }
}
