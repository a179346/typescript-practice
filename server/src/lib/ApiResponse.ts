import { Response } from 'express';

export type ApiResponse = Response & {
  model: any;
  handled: boolean | undefined;
};