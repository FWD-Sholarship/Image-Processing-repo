import {Router , Request, Response} from "express";
import {  } from "supertest";
const imgRouter = Router();
imgRouter.get('/' , ( req : Request  , res : Response):void=>{
    res.status( 200 ).send("hello from image route")
})
export default imgRouter;