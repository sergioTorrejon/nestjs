/* eslint-disable prefer-const */
import * as XLSX from 'xlsx';
export async function csvBuild(data:any) {

    const tituloHEader = 'Reporte-Documentos'
    const rowHeadesizer= [ 10, 15, 20, 50, 10]
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)
    let wscols = [];
    for (let i = 0; i < rowHeadesizer.length; i++) {  // columns length added
      wscols.push({ wch: rowHeadesizer[i] })
    }
    ws["!cols"] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, tituloHEader)
    const csv = await Buffer.from(XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }))
    return csv
  }