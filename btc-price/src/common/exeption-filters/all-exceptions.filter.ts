import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { ErrorMessageInterface } from '../interfaces/error-message.interface';


@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const responseBody = this.getResponseBody(exception);

    console.log(exception);

    responseBody.serverMessage = undefined;
    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.status);
  }

  private getResponseBody(exception: unknown): ErrorMessageInterface {
    const res: ErrorMessageInterface = {
      status: 0,
      message: '',
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof HttpException) {
      res.status = exception.getStatus();
      res.message = exception.message;
      return res;
    }

    if (exception instanceof EntityNotFoundError) {
      res.status = 404;
      res.message = 'Cannot find record with this param';
      res.serverMessage = exception.message;
      return res;
    }
    console.log(exception);
    res.message = 'Unexpected exception';
    res.status = 500;

    return res;
  }
}
