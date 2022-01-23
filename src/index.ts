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