import {promises as fs} from "fs"
export const isFileExist = async (fullPath : string):Promise<Boolean>=>{
    try{
      const filehandle:fs.FileHandle = await fs.open( fullPath , 'r')
      await filehandle.close()
      return true;
    }catch(e){
      return false;
    }
}