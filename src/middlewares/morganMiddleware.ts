import { Request, Response } from "express";
import morgan, { TokenIndexer } from "morgan";
import { DateUtils } from "../utils/date.utils";

export const morganMiddleware = morgan(function (tokens: TokenIndexer<Request, Response>, req: Request, res: Response) {
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
  ];

  return [DateUtils.getCurrentDate("YYYY-MM-DD HH:mm:ss"), ...logs].join(" ");
});
