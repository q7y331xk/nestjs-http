import { HttpStatus } from '@nestjs/common';
import { GenericObject } from './shared.type';

export abstract class ResponseJson {
  constructor(
    response?: GenericObject | string,
    message?: string,
    statusCode?: number,
    name?: string,
  ) {
    this.response = response;
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
  }
  response!: GenericObject | string;
  message!: string;
  statusCode!: number;
  name!: string;
}

export class ResponseSuccess extends ResponseJson {
  constructor(
    response?: GenericObject | string,
    message?: string,
    statusCode?: number,
  ) {
    super();
    this.response = response || 'ok';
    this.message = message || 'ok';
    this.statusCode = statusCode || HttpStatus.OK;
    this.name = 'HttpSuccess';
  }
}

export class ResponseException extends ResponseJson {
  constructor(
    message?: string,
    statusCode?: number,
    response?: GenericObject | string,
  ) {
    super();
    this.message = message || 'bad request';
    this.statusCode = statusCode || HttpStatus.BAD_REQUEST;
    this.response = response || this.message;
    switch (statusCode) {
      case HttpStatus.UNAUTHORIZED:
        this.name = 'Http Exception Unauthenticated';
        break;
      case HttpStatus.FORBIDDEN:
        this.name = 'Http Exception Forbidden';
        break;
      case HttpStatus.NOT_FOUND:
        this.name = 'Http Exception Not Found';
        break;
      default:
        this.name = 'Http Exception';
    }
  }
}

export type DefaultPromiseResponse = Promise<ResponseJson>;
