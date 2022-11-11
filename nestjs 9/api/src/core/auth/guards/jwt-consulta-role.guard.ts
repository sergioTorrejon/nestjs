import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class JwtConsultaRoleGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    console.log('inside JwtConsultaRoleGuard');
    console.log(user);
    console.log(user.role);
    if (user && user.role && user.role.some(r=> [Roles.OPERADOR, Roles.CONSULTA,Roles.SUPERVISOR,Roles.ADMINISTRADOR].includes(r)) ) {
      return user;
    } 
    throw new ForbiddenException();
  }
}