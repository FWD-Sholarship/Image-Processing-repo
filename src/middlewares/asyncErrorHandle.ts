import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../modules';
const asyncErrorHandlerMw = async (req:Request , res : Response , next :NextFunction)=>{
    try {
        // await asyncCall();
    } catch (error) {
        next(new ResponseError( 500 , "something went wrong"))
    }
}
export default asyncErrorHandlerMw;