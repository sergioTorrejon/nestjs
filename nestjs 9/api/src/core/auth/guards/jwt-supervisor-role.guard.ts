import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class JwtSupervisorRoleGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    //if(roles.includes('operador')||roles.includes('consulta')||roles.includes('administrador')||roles.includes('supervisor')){
        if (user && user.role && user.role.some(r=> [Roles.OPERADOR,Roles.SUPERVISOR, Roles.ADMINISTRADOR].includes(r))) {
      return user;
    } 
    throw new ForbiddenException();
  }
} 