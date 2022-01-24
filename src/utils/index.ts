import { promises as fs } from 'fs';
import pathes from '../constants/constants';
import path from 'path';
import sharp from 'sharp';
import fileExtensions from '../enmus/filesExtensions';
export const isFileExist = async (fullPath: string): Promise<boolean> => {
    try {
        const filehandle: fs.FileHandle = await fs.open(fullPath, 'r');
        await filehandle.close();
        return true;
    } catch (e) {
        return false;
    }
};

export const processImageToPng = async (
    filename: string,
    width: number,
    height: number
): Promise<void> => {
    const image = sharp(
        path.resolve(pathes.imagePath, filename + fileExtensions.jpg)
    );
    const size = await getRequiredImageSize(image, width, height);
    await image
        .resize({ width: size.width, height: size.height })
        .png({
            quality: 80,
            compressionLevel: 9,
            progressive: true,
            adaptiveFiltering: true,
        })
        .toFile(
            path.resolve(
                pathes.thumbsPath,
                filename +
                    width +
                    height +
                    fileExtensions.thumbs +
                    fileExtensions.png
            )
        );
};

export const getRequiredImageSize = async (
    image: sharp.Sharp,
    width: number,
    height: number
): Promise<{ width: number; height: number }> => {
    const meta = await image.metadata();
    if (!width) width = meta.width as number;
    if (!height) height = meta.width as number;
    return { width: width, height: height };
};

export default { getRequiredImageSize, processImageToPng, isFileExist };
