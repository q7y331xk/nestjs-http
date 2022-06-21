import { HttpStatus } from '@nestjs/common';

type GenericObject = { [key: string]: any };

export abstract class ResponseJson {
  constructor(response?: GenericObject | string, message?: string, status?: number, name?: string) {
    this.response = response;
    this.message = message;
    this.status = status;
    this.name = name;
  }
  response!: GenericObject | string;
  message!: string;
  status!: number;
  name!: string;
}

export class ResponseSuccess extends ResponseJson {
  constructor(response?: GenericObject | string, message?: string, status?: number) {
    super();
    this.response = response || "ok";
    this.message = message || "ok";
    this.status = status || HttpStatus.OK;
    this.name = "HttpSuccess";
  }
}

export class ResponseException extends ResponseJson {
  constructor(message?: string, status?: number, response?: GenericObject | string) {
    super()
    this.message = message || "bad request";
    this.status = status || HttpStatus.BAD_REQUEST;
    this.response = response || message || "bad request";
    this.name = "Http Exception";
  }
}

export class ResponseExceptionUnauthenticated extends ResponseJson {
  constructor(message?: string, status?: number, response?: GenericObject | string) {
    super()
    this.message = message || "unauthenticated";
    this.status = status || HttpStatus.UNAUTHORIZED;
    this.response = response || message || "unauthenticated";
    this.name = "Http Exception Unauthenticated";
  }
}

export class ResponseExceptionForbidden extends ResponseJson {
  constructor(message?: string, status?: number, response?: GenericObject | string) {
    super()
    this.message = message || "unauthorized";
    this.status = status || HttpStatus.FORBIDDEN;
    this.response = response || message || "unauthorized";
    this.name = "Http Exception Forbidden";
  }
}

export class ResponseExceptionNotFound extends ResponseJson {
  constructor(message?: string, status?: number, response?: GenericObject | string) {
    super()
    this.message = message || "not found";
    this.status = status || HttpStatus.BAD_REQUEST;
    this.response = response || message || "not found";
    this.name = "Http Exception Not Found";
  }
}

export type DefaultPromiseResponse = Promise<ResponseJson>

export class REMOVED {
  static readonly KEEP = 0;
  static readonly REMOVE = 1;
  static readonly HOLD = 2;
}
