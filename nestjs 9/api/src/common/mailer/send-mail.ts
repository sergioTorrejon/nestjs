import * as mail  from 'src/common/mailer/mailer-config';
import * as template  from 'src/common/mailer/templates/templates-email.service';
export async function sendMailer(dto:any) {
  const documento = dto.rc_tipo=='RA'?'Resolución Administrativa':'CC'?'Circular':'Documento'
  const transporter = await mail.mailerConfig();
  const mailFrom = `<${process.env.MAIL_USER}>`;
  const data = await transporter.sendMail({
    from: process.env.MAIL_TITLE+mailFrom, // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: documento + " Nro: "+ dto.rc_numero+'-'+dto.rc_year, // Subject line
    text: documento+" : " + dto.rc_filename, // plain text body
    html: await template.TemplateEmailService.armarPlantillaMailDocumentos(documento,dto)
        });
  return data;
}

