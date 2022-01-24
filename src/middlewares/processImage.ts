import { processImageToPng } from '../utils';
import { NextFunction, Response } from 'express';
import ImageRequest from '../modules/ImageRequest';
import { ResponseError } from '../modules';
import messages from '../enmus/messages';
export const processImageMw = async (
    req: ImageRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.alreadyProcessed)
            await processImageToPng(
                req.fileName || '',
                req.width || 0,
                req.height || 0
            );
        next();
    } catch (error) {
        next(new ResponseError(500, messages.serverErrorMessage));
    }
};
export default [processImageMw];
