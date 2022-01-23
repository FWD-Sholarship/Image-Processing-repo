import { NextFunction, Request, Response } from 'express';
const asyncErrorHandlerMw = async (req:Request , res : Response , next :NextFunction)=>{
    try {
        // await asyncCall();
    } catch (error) {
        next(new Error("something went wrong"))
    }
}
export default asyncErrorHandlerMw;