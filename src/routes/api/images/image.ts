import {Router , Request, Response} from "express";
import path from "path";
import {validationMW , processImageMw} from "../../../middlewares/validation";
import { ImageSize } from "../../../modules";
import ImageRequest from "../../../modules/ImageRequest";
const imgRouter = Router();
imgRouter.get('/' ,[validationMW , processImageMw ] , async ( req : ImageRequest  , res : Response):Promise<void>=>{
    res.setHeader('Cache-control' , 'max-age=604800')
    res.status( 200 ).sendFile(path.join(__dirname , "../../../assets/thumbs" ,  req.processedFileName || '') , 
    {cacheControl : true})
})
export default imgRouter;