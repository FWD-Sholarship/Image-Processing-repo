import { isFileExist } from './../utils/index';
import { NextFunction, Request, Response } from 'express';
import ImageRequest from '../modules/ImageRequest';
import path from 'path';
import {  ResponseError } from '../modules';
import messages from '../enmus/messages';
import pathes from '../constants/constants';
import fileExtensions from '../enmus/filesExtensions';

export const validateFileName = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { filename } = req.query;
    const imageRequest: ImageRequest = req;
    if (!filename) next(new ResponseError(404, messages.NotProvidedImage));
    try {
        if (
            !(await isFileExist(
                path.resolve(
                    pathes.imagePath,
                    (filename as string) + fileExtensions.jpg
                )
            ))
        ) {
            next(new ResponseError(404, messages.NotExistMessage));
        }
    } catch (error) {
        next(new ResponseError(500, messages.serverErrorMessage));
    }
    imageRequest.fileName = filename as string;
    next();
};
export const validateImageSize = async (
    req: ImageRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { width, height } = req.query;
    req.width = parseInt(width as string);
    req.height = parseInt(height as string);
    next();
};
export const validateIsImageProcessedBefore = async (
    req: ImageRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const fileName =
            (req.fileName || '') +
            req.width +
            req.height +
            fileExtensions.thumbs +
            fileExtensions.png;
        if (await isFileExist(path.resolve(pathes.thumbsPath, fileName)))
            req.alreadyProcessed = true;
    } catch (error) {
        next(new ResponseError(500, messages.serverErrorMessage));
    }
    next();
};
// please note that validationMiddleWares sequance may affect validation process
const validationMiddleWares = [
    validateFileName,
    validateImageSize,
    validateIsImageProcessedBefore,
];

export default validationMiddleWares;
