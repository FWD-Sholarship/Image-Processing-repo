// pseudo code
//#region stage 1 image processing
// 1- add image processing route
// 2- on get request validate request params (size) >> if not add default size
// 3- check file name exist and not processed before
// 4- if not exist return not exist message
// 5- if processed before return processed image
// 6- if processed before process image then return it 
//#endregion

//#region stage 2 add public static route
// if there is time
//#endregion
import express, {   NextFunction, Request, Response } from "express";
import morgan from "morgan";
import messages from "./enmus/messages";
import apiRouter from "./routes/api";
import {ResponseError } from "./modules"
const app = express();
const port = 3000;
app.use(morgan("tiny"));
app.use('/api' ,apiRouter)

app.use('*' , (req : Request , res : Response) =>{
    throw new ResponseError( 404 , messages.NotFoundRouteMessage)
})
app.use(( err:ResponseError , req:Request , res : Response , next : NextFunction ):void=>{
    res.status(err.status).json({message : err.message})
})
app.listen(port , ()=>{
    console.log("server working")
})
export default app;