import { Request, Response } from "express";
import { ILoggedUser } from "../user";
import { IInvalidRequest } from "../exception";

export interface IBaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  pagination?: IBasePageable;
  errors?: unknown;
}

export interface IPaginationResponse<T> {
  items: T[];
  total: number;
}

export interface IBasePageable {
  totalPages: number;
  totalElements: number; // Total Record
  numberOfElements: number; // Total record of a page
  size: number;
  page: number;
}

export interface IResponseEntity<T> {
  res: Response;
  data?: T;
  code?: number;
  message?: string;
  success?: boolean;
  pagination?: IBasePageable;
  errors?: unknown;
}

export interface CustomRequest extends Request {
  user?: ILoggedUser | null;
  invalidError?: IInvalidRequest;
}
