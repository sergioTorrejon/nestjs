/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificacionesDto } from './dtos';
import { Notificaciones } from './entities';
@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private readonly notificacionesRepository: Repository<Notificaciones>,
  ) {}

  async crearNotificaciones(id:number,dto) {
    console.log('dtonotiiii',dto)
    const notificaciones = await JSON.parse(dto.notificaciones);
    notificaciones.forEach(async notificacion => {
      notificacion.usuario_creacion = dto.usuario_creacion;
      notificacion.rc_id = id;
      await this.createNotificacionesOne(notificacion);
    });
  }

  async crearByIdNotificaciones(id:number,dto) {
    const notificaciones = await JSON.parse(dto.notificaciones);
    notificaciones.forEach(async notificacion => {
      if(notificacion.id==0)
      {
        notificacion.usuario_creacion = dto.usuario_creacion;
        notificacion.rc_id = id;
        await this.createNotificacionesOne(notificacion);
      }
    });
  }

  async createNotificacionesOne(dto: CreateNotificacionesDto) {
    const nuevo = await this.notificacionesRepository.create(dto);
    const create = await this.notificacionesRepository.save(nuevo);
    return await create;
  }

  async getById(id: number) { //arreglar
    const post = await this.notificacionesRepository
      .findOne(id);
    if (!post)
      throw new NotFoundException('Post does not exist or unauthorized');
    return post;
  }

  async deleteOne(dto:any) {
    return await this.notificacionesRepository.save(dto);
  }

  async getbyIdResoluciones(rc_id: number) {
    const data:Notificaciones[] = await this.notificacionesRepository
    .find({ where: [ {rc_id: rc_id, estado: true} ]});
    return data
  }
}
