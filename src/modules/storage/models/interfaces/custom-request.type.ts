import { Request } from 'express';

export interface ICustomRequest extends Request {
  paths: string[];
}
