import { Request } from "express";
interface ImageRequest extends Request {
    width?: number ,
    height?: number ,
    fileName?: string,
    processedFileName?:string ,
    alreadyProcessed?: boolean 
}

export default ImageRequest;