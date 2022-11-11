import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): { estado: string } {
    return {
      estado: 'El servicio esta activo!',
    };
  }
}
