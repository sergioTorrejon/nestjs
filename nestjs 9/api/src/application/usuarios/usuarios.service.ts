/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status, upper } from 'src/common/helpers/params';
import { PaginateDto, SortDto } from 'src/common/dtos';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioCreateDto, UsuarioSearchDto, UsuarioUpdateDto } from './dtos/usuarios.dto';
import { Roles } from 'src/core/auth/enums/roles.enum';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repositorio: Repository<Usuario>,
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

    async scriptOptions(){
      const script =  
        `
        select 
        username as value, 
        nombre_completo as label
        from usuarios
        where role in ('${Roles.SUPERVISOR}','${Roles.ADMINISTRADOR}')
        `
        return  script
    }
  
    async usuariosOptions(){
      const data = await this.repositorio.query(await this.scriptOptions())
      console.log('usuariooption', data)
      return data;
    }

    //PASAR A FUNCION
    async querySort(dto:SortDto){
      const query = ` ORDER BY ${dto.sort} ${await upper(dto.order)=="ASC"?"ASC":"DESC"} `
        return  query
    }

    async queryFilter(dto: UsuarioSearchDto){
      var filter=``;
      //dto.rc_inten != ''? filter= filter +  ` AND rc_inten = '${dto.rc_inten}' `:'';
      //dto.rc_year != 0? filter= filter +  ` AND rc_year = '${dto.rc_year}' `:'';
      //dto.rc_tipo != ''? filter= filter +  ` AND rc_tipo = '${dto.rc_tipo}' `:'';
      //dto.rc_subtipo != ''? filter= filter +  ` AND rc_subtipo = '${dto.rc_subtipo}' `:'';
      //dto.rc_mercado != ''? filter= filter +  ` AND rc_mercado = '${dto.rc_mercado}' `:'';
      //dto.del != ''? filter= filter +  ` AND rc_fecha >= '${dto.del}' `:'';
      //dto.al != ''? filter= filter +  ` AND rc_fecha <= '${dto.al}' `:'';
      //dto.rc_numero != ''? filter= filter + ` AND rc_numero ilike ('%${dto.rc_numero}%') `:'';
      //dto.rc_titulo != ''? filter= filter + ` AND unaccent(rc_titulo) ilike unaccent('%${dto.rc_titulo}%') `:'';
      return await filter
    }

    async queryBase(dto: UsuarioSearchDto)
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
    async queryCount(dto: UsuarioSearchDto){
      const query = `select count(*) from  (${await this.queryBase(dto)}) as table_count`
      return  query
    }
  
  //#endregion
    
    async getDataPaginate(dto: UsuarioSearchDto)
    {   
      const queryBase = await this.queryBase(dto);
      const queryPaginate = await this.queryPaginate(dto);
      const query = queryBase + queryPaginate;
      const data = await this.repositorio.query(query);  
      return data;
    } 
    
    async getCount(dto: UsuarioSearchDto)
    {   
      const count =  await this.repositorio.query(await this.queryCount(dto)); 
      return parseInt(count[0].count);
    } 

  //#region CRUD

    //------------CRUD GET ALL------------//ARREGLAR
    async getPaginate(dto: UsuarioSearchDto) {
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

    async getUser(dto: UsuarioCreateDto) {
      return await this.repositorio.findOne({where:{username: dto.username}});
    }

    //------------CRUD CREATE ONE------------//
    async createOne(dto: UsuarioCreateDto) {
      const data = await this.repositorio.create(dto);
      const create = await this.repositorio.save(data);
      return create;
    }

    async valUsuario(dto:UsuarioCreateDto) {
      dto.nombre_completo = dto.username;
      dto.role = dto.role;
      dto.status=Status.ACTIVO
      const user = await this.getUser(dto);
      if(!user){
        const nuevoUsuario = await this.createOne(dto);
        return nuevoUsuario;
      }
        const editarUsuario = await this.editOne(user.id,dto);
        return editarUsuario;
    }

    //------------CRUD UPDATE ONE------------//
    async editOne(id: number, dto: UsuarioUpdateDto) {
      const data = await this.getById(id);
      const editedPost = Object.assign(data, dto);
      return await this.repositorio.save(editedPost);
    }
    
    //------------CRUD DELETE ONE------------//
    async deleteOne(dto:any) {
      return await this.repositorio.save(dto);
    }
  //#endregion

}
