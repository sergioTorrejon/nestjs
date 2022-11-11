  export enum Status {
    CREADO = 'CREADO',
    ACTIVO = 'ACTIVO',
    APROBADO = 'APROBADO',
    INACTIVO = 'INACTIVO',
    PENDIENTE = 'PENDIENTE',
  }


  export enum Accion {
    CREADO = 'CREADO',
    DERIVADO = 'DERIVADO',
    RECUPERADO = 'RECUPERADO',
    PENDIENTE = 'PENDIENTE',
    RECHAZADO = 'RECHAZADO',
    MODIFICADO = 'MODIFICADO',
    APROBADO = 'APROBADO',
    RECIBIDO = 'RECIBIDO',
  }

  export function listYears() {
    const years=[]
    const yearinit = parseInt(process.env.YEAR_INITIAL, 10);
    const yearNow:number = ((new Date()).getFullYear());
    for (let i=0; yearinit+i <= yearNow; i++){
      years[i]= {value:yearNow-i,label:yearNow-i+''}
      }
    return years
  }

  export function formatDate(date:Date) {
    const dateFormat = new Date(date);
       return dateFormat.getDate() + '/' + dateFormat.getMonth() + '/' + dateFormat.getFullYear();
  }

  export function formatYear(date:Date) {
    const dateFormat = new Date(date);
       return dateFormat.getFullYear();
  }

  export const publicar: any =
  [
    {value:true , label:'Publicar'},
    {value:false , label:'No Publicar'}
  ];

  export function upper(word:string) {
    return word.toUpperCase();
}

export function first(data) {
  return data[0]
}

//ROLES
export enum Role {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  OPERADOR = 'operador',
  DEFAULT='default'
}