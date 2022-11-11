import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import { UserService } from 'src/core/user/user.service';
//import { JWT_SECRET } from 'src/config/constants';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(/*private userService: UserService,*/ private config: ConfigService) 
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    console.log('payload');
    console.log(payload);
    //return await this.userService.getOne(id);
    // retornamos un objeto
    if (typeof payload.role === "string") {
      payload.role = [payload.role];
    }
    return {
      username: payload.username,
      uid: payload.uid,
      company: payload.company,
      role: payload.role
    };
  }
}