/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartasResoluciones } from './entities';
import { Catalogos } from '../catalogos/entities/catalogos.entity';
import { CartasResolucionesCreateDto, CartasResolucionesSearchDto, CartasResolucionesUpdateDto } from './dtos';
import { SeguimientosService } from '../seguimientos/seguimientos.service';
import { countScript, paginateScript, sortScript } from 'src/common/scripts';
import { Accion, first, formatYear, Status } from 'src/common/helpers/params';
import { saveFile, validationFileSize } from 'src/common/file-manager/file-validation';
import { FAIL, FAIL_FILE_SIZE, FAIL_NAME, FAIL_UNIQUE, OK } from 'src/common/helpers/response';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { CC, RA } from 'src/common/helpers/const';


@Injectable()
export class CartasResolucionesService {
  constructor(
    @InjectRepository(CartasResoluciones)
    private readonly cartasResolucionesRepository: Repository<CartasResoluciones>,
    @InjectRepository(Catalogos)
    private readonly CatalogosRepository: Repository<Catalogos>,
    private readonly serviceNotificaciones: NotificacionesService,
    private readonly serviceSeguimientos: SeguimientosService,
  ) {}

  //#region REPOSITORIO
    async camposBase(){
      const string =  
        ` 
        id, 
        rc_inten,
        entidad,
        entidad_short,
        rc_tipo,
        tipo,
        rc_subtipo,
        subtipo,
        rc_year,
        rc_fecha,
        rc_numero,
        rc_alfa,
        rc_mercado,
        mercado,
        rc_publicar_web,
        rc_titulo,
        rc_comentarios,
        rc_filename,
        rc_filesize,
        etapa,
        usuario_creacion,
        usuario,
        observaciones,
        estado,
        publicaweb,
        tipodocumento,
        numero,
        gestion,
        institucion,
        fecha,
        titulo,
        tamanioarchivo,
        urlarchivo
        `
        return  string
    }

    async scriptBase(){
      const script =  
        ` from
        (select 
        rc.id, 
        rc.rc_inten,
        rc.rc_inten as institucion,
        ci.descrip entidad,
        SPLIT_PART(ci.descrip, '-', 2) entidad_short,
        rc.rc_tipo,
        rc.rc_tipo as tipodocumento,
        ct.descrip tipo,
        rc.rc_subtipo,
        cst.descrip subtipo,
        rc.rc_year,
        rc.rc_year as gestion,
        rc.rc_fecha,
        rc.rc_fecha as fecha,
        rc.rc_numero,
        rc.rc_numero as numero,
        rc.rc_alfa,
        rc.rc_mercado,
        cm.descrip mercado,
        rc.rc_publicar_web,
        rc.rc_publicar_web as publicaweb,
        rc.rc_titulo as titulo,
        rc.rc_titulo,
        rc.rc_comentarios,
        rc.rc_filename,
        rc.rc_filename as urlarchivo,
        rc.rc_filesize,
        rc.rc_filesize as tamanioarchivo,
        rc.usuario_creacion,
        COALESCE(sg.accion, null ,'HISTORICO') as accion,
        COALESCE(sg.etapa, null ,'APROBADO') as etapa,
        COALESCE(sg.usuario, null ,'HISTORICO') as usuario,
        COALESCE(sg.observaciones, null ,'') as observaciones,
        rc.estado
        from cartas_resoluciones as rc
        left join catalogos ci on ci.cod_ele = rc.rc_inten
        left join catalogos ct on ct.cod_ele = rc.rc_tipo
        left join catalogos cst on cst.cod_ele = rc.rc_subtipo
        left join catalogos cm on cm.cod_ele = rc.rc_mercado
        left join seguimiento sg on sg.id = rc.id_seguimiento) as tabla_consulta
        where estado = true
        `
        return  script
    }

    async queryData(){
      const query = `select ${await this.camposBase()} ${await this.scriptBase()}`
      return  query
    }
  
    async camposReporte(){
      //rc_fecha,
      const string =  `
        rc_year as gestion,  
        entidad_short as entidad,
        tipo,
        subtipo,
        mercado,
        TO_CHAR(rc_fecha,'DD-MM-YYYY') as fecha,
        rc_numero as numero,
        rc_titulo as titulo
        `
        return  string
    }


    async queryReport(dto: CartasResolucionesSearchDto){
      const queryBase = await this.queryBase(dto);
      const query = `select ${await this.camposReporte()} from(${queryBase}) as tabla_reporte`
      return  query
    }

    async getDataReport(dto: CartasResolucionesSearchDto) {
      const query = await this.queryReport(dto);
      const data= await this.query(query);
      return data
    }

    //PASAR A FUNCION
    async queryFilter(dto: CartasResolucionesSearchDto){
      var filter='';
      dto.rc_inten != ''? filter= filter+  ` AND rc_inten = '${dto.rc_inten}' `:'';
      dto.rc_year != 0? filter= filter +  ` AND rc_year = '${dto.rc_year}' `:'';
      dto.rc_tipo != ''? filter= filter +  ` AND rc_tipo = '${dto.rc_tipo}' `:'';
      dto.rc_subtipo != ''? filter= filter +  ` AND rc_subtipo = '${dto.rc_subtipo}' `:'';
      dto.rc_mercado != ''? filter= filter +  ` AND rc_mercado = '${dto.rc_mercado}' `:'';
      dto.del != ''? filter= filter +  ` AND rc_fecha >= '${dto.del}' `:'';
      dto.al != ''? filter= filter +  ` AND rc_fecha <= '${dto.al}' `:'';
      dto.rc_numero != ''? filter= filter + ` AND rc_numero ilike ('%${dto.rc_numero}%') `:'';
      dto.rc_titulo != ''? filter= filter + ` AND unaccent(rc_titulo) ilike unaccent('%${dto.rc_titulo}%') `:'';
      dto.etapa != ''? filter= filter +  ` AND etapa in ('${dto.etapa}') `:'';
      dto.modulo == ''? filter= filter +  ` AND etapa in ('APROBADO') `:'';
      dto.modulo == 'REGISTRO'? filter= filter +  ` AND usuario_creacion = '${dto.user}'`:'';
      dto.modulo == 'VERIFICACION'? filter= filter +  ` AND usuario = '${dto.user}' `:'';
      return await filter
    }

    async queryBase(dto: CartasResolucionesSearchDto)
    {   
      const script = await this.queryData();
      const queryFilter = await this.queryFilter(dto);
      const querySort = await sortScript(dto); 
      const queryBase = script + queryFilter + querySort;
      return queryBase;
    } 

    async query(script: string) {
      return await this.cartasResolucionesRepository.query(script);
    }

    async save(dto) {
      return await this.cartasResolucionesRepository.save(dto);
    }
    
    async count(queryBase: string) {   
      return await first(await this.query(await countScript(queryBase))).count; 
    } 

    //------------CRUD GET ALL------------//ARREGLAR
    async getDataPaginate(dto: CartasResolucionesSearchDto) {
      const queryBase = await this.queryBase(dto);
      const data= await this.query(queryBase+paginateScript(dto));
      const count =  await this.count(queryBase)
      return {data:data, count:count}
    }

    //------------CRUD GET ALL------------//ARREGLAR
    async getWebData(dto: CartasResolucionesSearchDto) {
      const queryBase = await this.queryBaseWeb(dto);
      const data= await this.query(queryBase+paginateScript(dto));
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if(!data[key].publicaweb){
            data[key].urlarchivo = "";
          }
          if (data[key].urlarchivo!= "")
          {
            data[key].urlarchivo = process.env.ROOT_WEB_DATA + data[key].id;
          }        
        }
      }
      const count =  await this.count(queryBase);
      return {status : 'Correcto', data : data, totalRows : count};
    }

    //------------CRUD GET ALL------------//ARREGLAR
    async getAdminData(dto: CartasResolucionesSearchDto) {
      const queryBase = await this.queryBaseAdmin(dto);
      const data= await this.query(queryBase+paginateScript(dto));
      const count =  await this.count(queryBase)
      return {data:data, count:count}
    }

    async queryBaseAdmin(dto: CartasResolucionesSearchDto)
    {   
      const script = await this.queryData();
      const queryFilter = await this.queryFilterAdmin(dto);
      const querySort = await sortScript(dto); 
      const queryBase = script + queryFilter + querySort;
      return queryBase;
    } 

    async queryFilterAdmin(dto: CartasResolucionesSearchDto){
      var filter='';
      dto.rc_inten != ''? filter= filter+  ` AND rc_inten = '${dto.rc_inten}' `:'';
      dto.rc_year != 0? filter= filter +  ` AND rc_year = '${dto.rc_year}' `:'';
      dto.rc_tipo != ''? filter= filter +  ` AND rc_tipo = '${dto.rc_tipo}' `:'';
      dto.rc_subtipo != ''? filter= filter +  ` AND rc_subtipo = '${dto.rc_subtipo}' `:'';
      dto.rc_mercado != ''? filter= filter +  ` AND rc_mercado = '${dto.rc_mercado}' `:'';
      dto.del != ''? filter= filter +  ` AND rc_fecha >= '${dto.del}' `:'';
      dto.al != ''? filter= filter +  ` AND rc_fecha <= '${dto.al}' `:'';
      dto.rc_numero != ''? filter= filter + ` AND rc_numero ilike ('%${dto.rc_numero}%') `:'';
      dto.rc_titulo != ''? filter= filter + ` AND unaccent(rc_titulo) ilike unaccent('%${dto.rc_titulo}%') `:'';
      dto.etapa != ''? filter= filter +  ` AND etapa in ('${dto.etapa}') `:'';
      dto.modulo == ''? filter= filter +  ` AND etapa in ('APROBADO') `:'';
      //dto.modulo == 'REGISTRO'? filter= filter +  ` AND usuario_creacion = '${dto.user}'`:'';
      //dto.modulo == 'VERIFICACION'? filter= filter +  ` AND usuario = '${dto.user}' `:'';
      return filter
    }

    async queryBaseWeb(dto: CartasResolucionesSearchDto)
    {   
      dto.sort = 'rc_year DESC, rc_numero '
      dto.order= 'DESC'
      console.log('dtoooooo',dto);
      
      const script = await this.queryData();
      const queryFilter = await this.queryFilter(dto);
      const querySort = await sortScript(dto); 
      const queryBase = script + queryFilter + querySort;
      return queryBase;
    } 

    //------------CRUD GET ONE------------//
    async getById(id: number) {
      const data = await this.cartasResolucionesRepository.findOne(id);
      if (!data)
        throw new NotFoundException(process.env.MESSAGE_FIND_ONE_NOT_FOUND);
      return data;
    }

    //------------CRUD CREATE ONE------------//
    
    async createOne(dto: CartasResolucionesCreateDto) {
      const data = await this.cartasResolucionesRepository.create(dto);
      const create = await this.save(data);
      return create;
    }

    //------------CRUD UPDATE ONE------------//
    async editOne(id: number, dto: CartasResolucionesUpdateDto) {
      const data = await this.getById(id);
      const edit = Object.assign(data, dto);
      const save = await this.save(edit);
      return save
    }
    
    //------------CRUD DELETE ONE------------//
    async deleteOne(id: number, user: string) {
      const dto = await this.getById(id);
      dto.estado=false
      dto.usuario_modificacion = user;
      const data = await this.save(dto);
      return data 
    }

  //#endregion

  
    //#region VALIIDATIONS

    async create(dto: CartasResolucionesCreateDto,file) {
      dto.rc_year = formatYear(dto.rc_fecha);
      //VALIDATE
      const unique = await this.validateUnique(dto);
      if (!unique)
        return {status:'error', message:FAIL_UNIQUE, data:[]};
      if (file != undefined)
      {
        dto.rc_filename= file.originalname;
        dto.rc_filesize= file.size;
        const size = await validationFileSize(file.size);
        if (!size)
        return {status:'error', message:FAIL_FILE_SIZE, data:[]};
        const fileName = await this.validateFileName(dto);
        if (!fileName)
        return {status:'error', message:FAIL_NAME, data:[]};
        const pathFolder = dto.rc_tipo=='RA'?RA:CC;
        
        await saveFile(pathFolder,file);
      }
      const data = await this.createOne(dto);
      await this.serviceNotificaciones.crearNotificaciones(data.id,dto);
      await this.maker(data);
            if(dto.derivado!='')
      {
        await this.asign(data,dto.derivado)
      }
      return { status: 'success',message: process.env.MESSAGE_INSERT_SUCCESS, data:data };
    }

    async update(id:number,dto: CartasResolucionesUpdateDto,file) {
      dto.rc_year = formatYear(dto.rc_fecha);
      const data = await this.getById(id);
      const edit = Object.assign(data, dto);
      if (edit.rc_filename == ''){ //ARREGLAR
        edit.rc_filename='';
        edit.rc_filesize= 0;
      }
      //VALIDATE
      if (edit.rc_year!=dto.rc_year)
      return {status:'error', message:'La no puede ser modificada gestión', data:[]};
      if (file != undefined)
      {
        edit.rc_filename= file.originalname;
        edit.rc_filesize= file.size;
        const size = await validationFileSize(file.size);
        if (!size)
        return {status:'error', message:FAIL_FILE_SIZE, data:[]};
        const fileName = await this.validateFileName(edit);
        if (!fileName)
        return {status:'error', message:FAIL_NAME, data:[]};
        const pathFolder = edit.rc_tipo=='RA'?RA:CC;
        await saveFile(pathFolder,file);
      }
      const save = await this.save(edit);
      await this.modify(save);
      await this.serviceNotificaciones.crearByIdNotificaciones(data.id,dto);
      //await sendMailer(save);
      if(edit.derivado!='')
      {
        await this.asign(data,edit.derivado)
      }
      return { status: 'success',message: process.env.MESSAGE_INSERT_SUCCESS, data:save };
    }

    async validateUnique(dto: CartasResolucionesCreateDto) {
      const data = await this.cartasResolucionesRepository.count(
        { where: {rc_tipo: dto.rc_tipo, rc_numero: dto.rc_numero, rc_year:dto.rc_year,estado:true} 
        });

        console.log('validateUnique', data)
      if (data>0){
        return FAIL;
      }
      return OK; 
    }

    async validateFileName(dto: CartasResolucionesCreateDto) {
      const headName = dto.rc_numero+'-'+dto.rc_year.toString().substring(2,4)+'-'+dto.rc_tipo+'APS';
      const headFileName = dto.rc_filename.substring(0,13);
      const dirName = dto.rc_filename.substring(13,15);
      const typeFile = dto.rc_filename.substring(dto.rc_filename.length-4,dto.rc_filename.length);
      if (await headName!=headFileName){
        return FAIL
      }
      const direccion = await this.CatalogosRepository
      .findOne({ where: [ {cod_tab: "DIR", cod_ele: dirName }]});
      if (!direccion)
      {
        return FAIL
      }
      if ( typeFile.toLowerCase()!='.pdf')
      {
        return FAIL
      }

      return OK;
    }
    //#endregion

  //#region NOTIFICACIONES //ARREGLAR
    async maker(dto) {
      dto.id_documento=dto.id;
      dto.accion = Accion.CREADO;
      dto.etapa = Status.CREADO;
      dto.usuario=dto.usuario_creacion;
      dto.fechaCreacion= new Date();
      const nuevo = await this.serviceSeguimientos.createOne(dto);
      dto.id_seguimiento=nuevo.id;
      return await this.activeSeguimiento(dto);
    }

    async modify(dto) {
      dto.id_documento=dto.id;
      dto.accion = Accion.MODIFICADO;
      dto.etapa = Status.CREADO;
      dto.usuario=dto.usuario_creacion;
      dto.fechaCreacion= new Date();
      const nuevo = await this.serviceSeguimientos.createOne(dto);
      dto.id_seguimiento=nuevo.id;
      return await this.activeSeguimiento(dto);
    }

    async asign(dto, derivado:string) {
      dto.id_documento=dto.id;
      dto.accion = Accion.DERIVADO;
      dto.etapa = Status.CREADO;
      dto.usuario=dto.usuario_creacion;
      dto.fechaCreacion= new Date();
      await this.serviceSeguimientos.createOne(dto);
      dto.accion = Accion.RECIBIDO;
      dto.etapa = Status.PENDIENTE;
      dto.usuario=derivado;
      dto.fechaCreacion= new Date();
      const nuevo = await this.serviceSeguimientos.createOne(dto);
      dto.id_seguimiento=nuevo.id;
      return await this.activeSeguimiento(dto);
    }

    async refuse(dto, observaciones:string) {
      dto.id_documento=dto.id;
      dto.accion = Accion.RECHAZADO;
      dto.etapa = Status.PENDIENTE;
      dto.observaciones=observaciones;
      dto.usuario=dto.usuario_modificacion;
      dto.fechaCreacion= new Date();
      await this.serviceSeguimientos.createOne(dto);
      dto.accion = Accion.RECIBIDO;
      dto.etapa = Status.CREADO;
      dto.usuario=dto.usuario_creacion;
      dto.fechaCreacion= new Date();
      const nuevo = await this.serviceSeguimientos.createOne(dto);
      dto.id_seguimiento=nuevo.id;
      return await this.activeSeguimiento(dto);
    }

    async checker(dto) {
      dto.id_documento=dto.id;
      dto.accion = Accion.APROBADO;
      dto.etapa=Status.APROBADO;
      dto.usuario=dto.usuario_modificacion;
      dto.fechaCreacion= new Date();
      const nuevo = await this.serviceSeguimientos.createOne(dto);
      dto.id_seguimiento=nuevo.id;
      //const mail = await sendMailer(dto);
      //if(!mail) return 'El mail no se pudo enviar'
      return await this.activeSeguimiento(dto);
    }

    async activeSeguimiento(dto: CartasResolucionesCreateDto) {
      return await this.cartasResolucionesRepository.save(dto);
    }

  //#endregion  

    //#region QUERYS PARA ADMIN
    //PASAR A FUNCION
    async queryAdminFilter(dto: CartasResolucionesSearchDto){
      var filter='';
      dto.rc_inten != ''? filter= filter+  ` AND rc_inten = '${dto.rc_inten}' `:'';
      dto.rc_year != 0? filter= filter +  ` AND rc_year = '${dto.rc_year}' `:'';
      dto.rc_tipo != ''? filter= filter +  ` AND rc_tipo = '${dto.rc_tipo}' `:'';
      dto.rc_subtipo != ''? filter= filter +  ` AND rc_subtipo = '${dto.rc_subtipo}' `:'';
      dto.rc_mercado != ''? filter= filter +  ` AND rc_mercado = '${dto.rc_mercado}' `:'';
      dto.del != ''? filter= filter +  ` AND rc_fecha >= '${dto.del}' `:'';
      dto.al != ''? filter= filter +  ` AND rc_fecha <= '${dto.al}' `:'';
      dto.rc_numero != ''? filter= filter + ` AND rc_numero ilike ('%${dto.rc_numero}%') `:'';
      dto.rc_titulo != ''? filter= filter + ` AND unaccent(rc_titulo) ilike unaccent('%${dto.rc_titulo}%') `:'';
      dto.etapa != ''? filter= filter +  ` AND etapa in ('${dto.etapa}') `:'';
      dto.modulo == ''? filter= filter +  ` AND etapa in ('APROBADO') `:'';
      //dto.modulo == 'REGISTRO'? filter= filter +  ` AND usuario_creacion = '${dto.user}'`:'';
      //dto.modulo == 'VERIFICACION'? filter= filter +  ` AND usuario = '${dto.user}' `:'';
      return await filter
    }


    //#endregion
}
