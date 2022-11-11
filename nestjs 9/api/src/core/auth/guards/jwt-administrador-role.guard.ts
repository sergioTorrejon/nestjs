import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class JwtAdministradorRoleGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    console.log('inside JwtSupervisorRoleGuard');
    console.log(user);
    if (user && user.role && user.role.includes(Roles.ADMINISTRADOR)) {
      return user;
    } 
    throw new ForbiddenException();
  }
} 