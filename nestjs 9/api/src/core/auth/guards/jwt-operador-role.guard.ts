import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class JwtOperadorRoleGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    console.log('inside JwtOperadorRoleGuard');
    console.log(user);
    if (user && user.role && user.role.some(r=> [Roles.OPERADOR, Roles.SUPERVISOR,Roles.ADMINISTRADOR].includes(r)) ) {
      return user;
    } 
    throw new ForbiddenException();
  }
} 