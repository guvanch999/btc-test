import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    // const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        // console.log(request.method, " ", request.originalUrl);
        console.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}