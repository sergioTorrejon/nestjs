import * as dotenv from 'dotenv';
dotenv.config();
//OK FAIL
export const OK=true
export const FAIL=false
//CONNECCTION
export const CONNECCTION_SUCCESS={status:'success', message:process.env.MESSAGE_CONNECCTION_SUCCESS}//COnexion OK
export const CONNECCTION_ERROR={status:'error', message:process.env.MESSAGE_CONNECCTION_ERROR}//COnexion FAIL
//RETURN
export const SUCCESS_RETURN={status:'success', message:process.env.MESSAGE_RETURN_SUCCESS}//Return OK
export const SUCCESS_NOT_FOUND={status:'success', message:process.env.MESSAGE_RETURN_SUCCESS_NOT_FOUND}//Return OK Sin Data
export const EXCEPTION_NOT_FOUND=process.env.MESSAGE_EXCEPTION_NOT_FOUND
export const EXCEPTION_NOT_FOUND_ID=process.env.MESSAGE_EXCEPTION_NOT_ID

//UNIQUE
export const SUCCESS={res:true, message:process.env.MESSAGE_RETURN_SUCCESS}//CAMPO UNICO OK
export const FAIL_UNIQUE=process.env.MESSAGE_EXCEPTION_PRECONDITION_UNIQUE//CAMPO UNICO DUPLICADO

//EXCEPTIONS
export const FAIL_NAME=process.env.MESSAGE_EXCEPTION_PRECONDITION_FILE_NAME//COnexion Correcta
export const FAIL_DIRECCION={res:false, status:'error', message:process.env.MESSAGE_EXCEPTION_PRECONDITION_FILE_DIRECCION}//COnexion Correcta
export const FAIL_EXTENSION={res:false, status:'error', message:process.env.MESSAGE_EXCEPTION_PRECONDITION_FILE_EXTENSION}//COnexion Correcta
export const FAIL_FILE_SIZE= process.env.MESSAGE_EXCEPTION_PRECONDITION_FILE_SIZE//COnexion Correcta
export const FAIL_FILE_SAVE={res:false, status:'error', message:process.env.MESSAGE_EXCEPTION_PRECONDITION_FILE_SAVE}//COnexion Correcta

//FUNCIONES
//RESPONSE
export async function response(data) {
  if (!data) {
      return {res: this.EXCEPTION_NOT_FOUND, data:[]};
  }
  if (data.length==0) {
      return {res: this.SUCCESS_NOT_FOUND, data:[]};
  }
  return {res: this.SUCCESS_RETURN, data:data};
}  



//CRUD
//GET
export const SUCCESS_GET=process.env.MESSAGE_SUCCESS_GET
export const FAIL_GET=process.env.MESSAGE_FAIL_GET

//GET ID
export const SUCCESS_GET_ID=process.env.MESSAGE_SUCCESS_GET_ID
export const FAIL_GET_ID=process.env.MESSAGE_FAIL_GET_ID

//POST
export const SUCCESS_POST=process.env.MESSAGE_SUCCESS_POST
export const FAIL_POST=process.env.MESSAGE_FAIL_POST

//PUT
export const SUCCESS_PUT=process.env.MESSAGE_SUCCESS_PUT
export const FAIL_PUT=process.env.MESSAGE_FAIL_PUT

//DELETE
export const SUCCESS_DELETE=process.env.MESSAGE_SUCCESS_DELETE
export const FAIL_DELETE=process.env.MESSAGE_FAIL_DELETE

//RESPONSE SUCCESS
export async function responseSuccess(message:string,data:any=[]) {
  return {status:'success', message:message,data:data};
}

//RESPONSE EXCEPTION
export async function responseExpection(message:string) {
  return {status:'error', message:message, data:[]};
}