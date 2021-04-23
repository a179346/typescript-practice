import { eHTTP_CODE } from './enum';

export class ApiError extends Error {
  public status: eHTTP_CODE;
  constructor (status: eHTTP_CODE, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}