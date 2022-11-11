import * as fs from 'fs';
import * as r from 'src/common/helpers/response';

  export async function existPath(pathFolder:string) {
    console.log('pathFolderpathFolderpathFolderpathFolder',pathFolder)
    if(!await fs.existsSync(pathFolder)){
      return r.FAIL;
    }
    return r.OK; 
  }
 
  export async function createFolder(pathFolder:string) {
    
    if(!await existPath(pathFolder)){
      await fs.mkdirSync(pathFolder);
      if(!await existPath(pathFolder)){
        return r.FAIL_FILE_SAVE;
      }
      return r.OK;
    }
    return r.OK;
  }

  export async function validationFileSize(fileSize:number) {
    if (fileSize>parseInt(process.env.FILE_SIZE_MAX, 10))
    {
      return r.FAIL;
    }  
    return r.OK;
  }  

  export async function saveFile(pathFolder:string,file) {
    
    await createFolder(pathFolder)
    const fileStream = await fs.createWriteStream(pathFolder+file.originalname);
    await fileStream.write(file.buffer);
    await fileStream.end()
    if(!await existPath(pathFolder+file.originalname)){
      return r.FAIL_FILE_SAVE;
    }
    return r.OK; 
  }  


