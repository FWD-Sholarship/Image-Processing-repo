import { Router, Response } from 'express';
import path from 'path';
import {
    validationsMiddleWares,
    processImageMiddleWares,
} from '../../../middlewares';
import ImageRequest from '../../../modules/ImageRequest';
import pathes from '../../../constants/constants';
import fileExtensions from '../../../enmus/filesExtensions';
const imgRouter = Router();
imgRouter.get(
    '/',
    [...validationsMiddleWares, ...processImageMiddleWares],
    async (req: ImageRequest, res: Response): Promise<void> => {
        res.setHeader('Cache-control', 'max-age=604800');
        res.status(200).sendFile(
            path.join(
                pathes.thumbsPath,
                (req.fileName || '') + req.width + req.height + fileExtensions.thumbs  + fileExtensions.png
            ),
            { cacheControl: true }
        );
    }
);
export default imgRouter;
