
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ResponseJson } from './types';

@Catch(ResponseJson)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(responseJson: ResponseJson, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = responseJson.statusCode;

    response
      .status(statusCode)
      .json({
        timestamp: new Date().toISOString(),
        ...responseJson
      });
  }
}