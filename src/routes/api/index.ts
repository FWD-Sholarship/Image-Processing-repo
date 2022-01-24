import { Router } from 'express';
import imgRouter from './images/image';

const apiRouter = Router();
apiRouter.use('/image', imgRouter);

export default apiRouter;
