/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import { JwtOperadorRoleGuard } from 'src/core/auth/guards/jwt-operador-role.guard';
import { JwtConsultaRoleGuard } from 'src/core/auth/guards/jwt-consulta-role.guard';
import { UsuariosService } from './usuarios.service';
import { UsuarioCreateDto, UsuarioSearchDto } from './dtos/usuarios.dto';
import { Status } from 'src/common/helpers/params';
import { JwtSupervisorRoleGuard } from 'src/core/auth/guards/jwt-supervisor-role.guard';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly service: UsuariosService,
  ) {}

  //#region CRUD
  //---------------GET DATA PAGINATE------------//
  @Get()
  async getAll(@Query() dto: UsuarioSearchDto) {
      return await this.service.getPaginate(dto) 
  }

   @Get('paginate/')
  async getDataPaginate(@Query() dto: UsuarioSearchDto) {
      return await this.service.getPaginate(dto) 
  } 
  
  @Post()
  @UseGuards(JwtOperadorRoleGuard)   
  async createPost(@Req() request, @Body() dto:UsuarioCreateDto) {
    dto.usuario_creacion = request.user.username;
    const data = await this.service.createOne(dto);
    return { status: "success",message: process.env.MESSAGE_INSERT_SUCCESS, data };
  }

  @Put(':id')
  @UseGuards(JwtOperadorRoleGuard)  
  async editOne(@Req() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto,
  ) {
    dto.usuario_modificacion = request.user.username;
      const data = await this.service.editOne(id, dto);
    return { message: 'Documento editado', data };//ARREGLAR
  }  

  @Delete(':id')
  @UseGuards(JwtOperadorRoleGuard)  
  async deleteOne(@Req() request,@Param('id', ParseIntPipe) id: number) {
    const dto = await this.service.getById(id);
    dto.status = Status.INACTIVO;
    dto.usuario_modificacion = request.user.username;
    const data = await this.service.deleteOne(dto);
    return { message: process.env.MESSAGE_DELETE_ONE+" Nro: "+data.id, data };
  }

//#endregion

  @Get('downloadpdf/')
  @UseGuards(JwtConsultaRoleGuard)  
  async getReportDataPdf(@Query() dto: UsuarioSearchDto, @Res() res) {
    const data = await this.service.getPaginate(dto)
    const stats = data.data
      let tituloReport = 'Reporte-Documentos'
      let header = ['id','entidad','tipo','subtipo','rc_numero','rc_titulo']
      //for (let h in stats[0]) {
      //  header.push(h)
      //}
      //cuerpo
      let body = []
      for (let row of stats) {
        var dateR = new Date(row.fecha);
        row.fecha = dateR.getDate() + '/' + dateR.getMonth() + '/' + dateR.getFullYear();
        let r = []
        for (let h of header) {
          r.push(row[h] || '')
        }
        body.push(r)
      }
      let doc = new jsPDF('landscape', 'cm', 'a4')
      doc.setFontSize(10);
      doc.text("AUTORIDAD DE FISCALIZACION Y CONTROL DE PENSIONES Y SEGUROS", doc.internal.pageSize.width / 6, 2)
      doc.text("REPORTE CARTAS Y RESOLUCIONES ", doc.internal.pageSize.width / 6, 3)
      doc.setFontSize(7);
      autoTable(doc,{
        startY: 4,
        styles: {fontSize: 7},
        head: [header],
        body: body
      })
      doc.setProperties({
        title: tituloReport
      })
      //devolver documento
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline; filename=${tituloReport}.pdf`)
      return res.send(Buffer.from(doc.output('arraybuffer')))
  }

  @Get('usuario/')
  @UseGuards(JwtConsultaRoleGuard)  
  async getusuario(@Req() request,) {
    const usuario = this.service.valUsuario(request.user)
      return usuario
  }


  
//#endregion
 
}
