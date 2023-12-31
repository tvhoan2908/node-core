import { Request, Response } from "express";
import morgan, { TokenIndexer } from "morgan";
import { DateUtils } from "../utils/date.utils";
import { LogUtils } from "../utils";
import { CustomRequest } from "../@types";

export const morganMiddleware = morgan(function (
  tokens: TokenIndexer<Request, Response>,
  req: CustomRequest,
  res: Response,
) {
  let messageError = null;
  if (req.invalidError) {
    messageError = `Error: ${JSON.stringify(req.invalidError)}`;
  }
  let messageUser = null;
  if (req.user) {
    messageUser = `User: ${JSON.stringify({ _id: req.user.id, username: req.user.username })}`;
  }
  const logs = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    `Body: ${JSON.stringify(req.body)}`,
    `Params: ${JSON.stringify(req.params)}`,
    `Query: ${JSON.stringify(req.query)}`,
    messageError,
    messageUser,
  ];
  LogUtils.logApi(logs.join(" "));

  return [DateUtils.getCurrentDate("YYYY-MM-DD HH:mm:ss"), ...logs].join(" ");
});
