/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  Notificados } from './entities';
import {  CreateNotificadosDto } from './dtos';


@Injectable()
export class NotificadosService {
  constructor(
    @InjectRepository(Notificados)
    private readonly notificadosRepository: Repository<Notificados>,
  ) {}

  //------------CRUD GET ALL WITH PAGINATE------------//
  async getDataFilter( descripcion: string ) {
    const data = await this.notificadosRepository
    .createQueryBuilder("notificados")
    .select("notificados.descripcion", "descripcion")
    .where("notificados.estado = :estado", { estado: true })
    .where("unaccent(notificados.descripcion) ilike unaccent('%"+ descripcion +"%')")
    .getRawMany();
    return data
  }
  
  async createOne(dto: CreateNotificadosDto) {
    const post = this.notificadosRepository.create(dto);
    console.log(post)
    return await this.notificadosRepository.save(post);
  }

}
