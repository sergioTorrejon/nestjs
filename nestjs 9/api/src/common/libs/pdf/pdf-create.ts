/* eslint-disable prefer-const */
import * as params from 'src/common/helpers/params';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

export async function pdfBuild(data:any) {

    const tituloReport = 'Reporte-Documentos'
    const header = []
    for (let h in data[0]) {
      header.push(h)
    }
    //cuerpo
    let body = []
    for (let row of data) {
      row.fecha = params.formatDate(row.fecha)
      let r = []
      for (let h of header) {
        r.push(row[h] || '')
      }
      body.push(r)
    }
    let doc = new jsPDF('landscape', 'cm', 'a4')
    doc.setFontSize(10);
    doc.text("REPORTE SIRECI", doc.internal.pageSize.width / 3, 1)
    doc.setFontSize(7);
    doc.setTextColor('red')
    autoTable(doc,{
      startY: 2,
      styles: {fontSize: 7},
      head: [header],
      body: body
    })
    doc.setProperties({
      title: tituloReport
    })
    const pdf = await Buffer.from(doc.output('arraybuffer'));
    return pdf
  }