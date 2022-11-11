import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies';
import { JwtOperadorRoleGuard } from './guards/jwt-operador-role.guard';
import { JwtConsultaRoleGuard } from './guards/jwt-consulta-role.guard';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '5m' },
      }),
    }),
  ],
  providers: [JwtStrategy, JwtOperadorRoleGuard, JwtConsultaRoleGuard],
})
export class AuthModule {}
