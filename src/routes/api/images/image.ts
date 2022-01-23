import { Router, Response } from 'express'
import path from 'path'
import { validationMW, processImageMw } from '../../../middlewares/validation'
import ImageRequest from '../../../modules/ImageRequest'
import pathes from '../../../constants/constants'
const imgRouter = Router()
imgRouter.get(
    '/',
    [validationMW, processImageMw],
    async (req: ImageRequest, res: Response): Promise<void> => {
        res.setHeader('Cache-control', 'max-age=604800')
        res.status(200).sendFile(
            path.join(pathes.thumbsPath, req.processedFileName || ''),
            { cacheControl: true }
        )
    }
)
export default imgRouter
