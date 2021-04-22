import { Response } from 'express';

type ApiResponse = Response & {
  model: any;
  handled: boolean | undefined;
};

export default ApiResponse;