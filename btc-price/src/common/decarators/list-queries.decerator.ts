import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ListQueries = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return {
      page: parseInt(request.query.page + '') || 1,
      limit: parseInt(request.query.limit + '') || 20,
      startDate: request.query.startDate || undefined,
      endDate: request.query.endDate || undefined,
    };
  },
);
