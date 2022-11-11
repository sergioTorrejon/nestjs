/* eslint-disable @typescript-eslint/camelcase */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReadDto = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const dto = request.body;
    dto.user= request.user.username;
    dto.usuario_creacion= request.user.username;
    return data ? dto && dto[data] : dto;
  },
);
