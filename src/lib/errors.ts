export class HttpError extends Error {
  status: number;
  body?: any;
  constructor(status: number, message: string, body?: any) {
    super(message);
    this.status = status;
    this.body = body ?? { message };
  }
}

export const badRequest = (msg='Bad Request', body?:any)=> new HttpError(400, msg, body);
export const unauthorized = (msg='Unauthorized')=> new HttpError(401, msg);
export const notFound = (msg='Not Found')=> new HttpError(404, msg);
export const conflict = (msg='Conflict', body?:any)=> new HttpError(409, msg, body);
