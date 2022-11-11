import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    //console.log('requesttttt',request)
    const query = request.query;
    query.user= request.user.username;
    query.role= request.user.role[0];
    return data ? query && query[data] : query;
  },
);
