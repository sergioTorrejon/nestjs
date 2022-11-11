/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { upper } from 'src/common/helpers/params';
import { PaginateDto, SortDto } from 'src/common/dtos';
import { Seguimiento } from './entities/seguimientos.entity';
import { SeguimientoCreateDto, SeguimientoSearchDto, SeguimientoUpdateDto } from './dtos/seguimientos.dto';

@Injectable()
export class SeguimientosService {
  constructor(
    @InjectRepository(Seguimiento)
    private readonly repositorio: Repository<Seguimiento>,
  ) {}
  //#region REPOSITORIO
    
    async scriptBase(){
      const script =  
        `
        select 
        rc.id, 
        rc.rc_inten,
        ci.descrip entidad,
        SPLIT_PART(ci.descrip, '-', 2) entidad_short,
        rc.rc_tipo,
        ct.descrip tipo,
        rc.rc_subtipo,
        cst.descrip subtipo,
        rc.rc_year,
        rc.rc_fecha,
        rc.rc_numero,
        rc.rc_alfa,
        rc.rc_mercado,
        cm.descrip mercado,
        rc.rc_publicar_web,
        rc.rc_titulo,
        rc.rc_comentarios,
        rc.rc_filename,
        rc.rc_filesize,
        rc.estado
        from cartas_resoluciones as rc
        left join catalogos ci on ci.cod_ele = rc.rc_inten
        left join catalogos ct on ct.cod_ele = rc.rc_tipo
        left join catalogos cst on cst.cod_ele = rc.rc_subtipo
        left join catalogos cm on cm.cod_ele = rc.rc_mercado
        where rc.activo = true
        `
        return  script
    }
  
    //PASAR A FUNCION
    async querySort(dto:SortDto){
      const query = ` ORDER BY ${dto.sort} ${await upper(dto.order)=="ASC"?"ASC":"DESC"} `
        return  query
    }

    async queryFilter(dto: SeguimientoSearchDto){
      var filter=``;
      return await filter
    }

    async queryBase(dto: SeguimientoSearchDto)
    {   
      const script = await this.scriptBase();
      const queryFilter = await this.queryFilter(dto);
      const querySort = await this.querySort(dto); 
      const queryBase = await script + queryFilter + querySort;
      return queryBase;
    } 
  
    //PASAR A FUNCION
    async queryPaginate(dto:PaginateDto){
      const query = ` LIMIT ${parseInt(dto.limit)} OFFSET ${(parseInt(dto.page)-1)*(parseInt(dto.limit))} `
        return  query
    }
  
    //PASAR A FUNCION 
    async queryCount(dto: SeguimientoSearchDto){
      const query = `select count(*) from  (${await this.queryBase(dto)}) as table_count`
      return  query
    }
  
  //#endregion
    
    async getDataPaginate(dto: SeguimientoSearchDto)
    {   
      const queryBase = await this.queryBase(dto);
      const queryPaginate = await this.queryPaginate(dto);
      const query = queryBase + queryPaginate;
      const data = await this.repositorio.query(query);  
      return data;
    } 
    
    async getCount(dto: SeguimientoSearchDto)
    {   
      const count =  await this.repositorio.query(await this.queryCount(dto)); 
      return parseInt(count[0].count);
    } 

  //#region CRUD

    //------------CRUD GET ALL------------//ARREGLAR
    async getPaginate(dto: SeguimientoSearchDto) {
      try {
        const data= await this.getDataPaginate(dto);
        const count =  await this.getCount(dto)
        return {data:data, count:count}
      } 
      catch (error) {
        //return r.responseExpection(r.FAIL_GET+error)
        return error
      }
    }

    //------------CRUD GET ONE------------//
    async getById(id: number) {
      const data = await this.repositorio.findOne(id);
      if (!data)
        throw new NotFoundException(process.env.MESSAGE_FIND_ONE_NOT_FOUND);
      return data;
    }


        //------------CRUD GET ONE------------//
    async getByIdDoc(id: number) {
      const data = await this.repositorio.find({where:{id_documento: id}});
      if (!data)
        throw new NotFoundException(process.env.MESSAGE_FIND_ONE_NOT_FOUND);
      return {data:data};
    }

    //------------CRUD CREATE ONE------------//
    
    async createOne(dto: SeguimientoCreateDto) {
      const data = await this.repositorio.create(dto);
      const create = await this.repositorio.save(data);
      return create;
    }

  //#endregion
 
}
