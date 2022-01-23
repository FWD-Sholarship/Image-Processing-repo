import { isFileExist } from './../utils/index'
import { NextFunction, Request, Response } from 'express'
import ImageRequest from '../modules/ImageRequest'
import path from 'path'
import sharp from 'sharp'
import { ImageSize, ResponseError } from '../modules'
import messages from '../enmus/messages'
import pathes from '../constants/constants'
export const validationMW = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { width, height, filename } = req.query
    const imageRequest: ImageRequest = req
    if (!filename) next(new ResponseError(404, messages.NotProvidedImage))
    try {
        if (
            !(await isFileExist(
                path.resolve(pathes.imagePath, (filename as string) + '.jpg')
            ))
        ) {
            next(new ResponseError(404, messages.NotExistMessage))
        }
    } catch (error) {
        next(new ResponseError(500, messages.serverErrorMessage))
    }
    if (width) imageRequest.width = parseInt(width as string)
    if (height) imageRequest.height = parseInt(height as string)
    const processedFileName: string = (filename as string) + '.thumbs.png'
    try {
        if (
            await isFileExist(
                path.resolve(pathes.thumbsPath, processedFileName)
            )
        ) {
            imageRequest.alreadyProcessed = true
        }
    } catch (error) {
        next(new ResponseError(404, messages.serverErrorMessage))
    }
    imageRequest.fileName = (filename as string) + '.jpg'
    imageRequest.processedFileName = processedFileName
    next()
}
export const processImageMw = async (
    req: ImageRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const image = sharp(path.resolve(pathes.imagePath, req.fileName || ''))
    try {
        await image
            .resize({ width: req.width, height: req.height })
            .png({
                quality: 80,
                compressionLevel: 9,
                progressive: true,
                adaptiveFiltering: true,
            })
            .toFile(
                path.resolve(pathes.thumbsPath, req.processedFileName || '')
            )
        next()
    } catch (error) {
        next(new ResponseError(500, messages.serverErrorMessage))
    }
}
export default { validationMW, processImageMw }
