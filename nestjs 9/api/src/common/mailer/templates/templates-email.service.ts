import { formatDate } from "src/common/helpers/params";

export class TemplateEmailService {

  static async armarPlantillaMailDocumentos(documento:string,dto:any) {
    return `
    <b> Nueva ${documento} Registrada  </b>
    </hr>
    <p> Por la presente se comunica a todos los empleados de la APS que se ha registrado la ${documento} APS Nº 
    ${dto.rc_numero}  de ${await formatDate(dto.rc_fecha)}  con la siguiente referenciaser:</p>
    </hr>
     <h1>Título: ${dto.rc_titulo}</h1>
     </hr>
    <h3>${dto.rc_comentarios}</h3>
     </hr>
     </hr>
    </hr>
    </hr>
    <p>Esta ${documento} puede ser leida en su totalidad accediendo al siguiente vinculo:</p>
    </hr>
    </hr>
    <a href= ${process.env.MAIL_URL+dto.id}>${dto.rc_filename}</a>
    <img src="images/dinosaur.jpg">
    `;
  }

}
