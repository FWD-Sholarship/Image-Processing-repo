import path from 'path';
import pathes from '../../constants/constants';
import {
    isFileExist,
    getRequiredImageSize,
    processImageToPng,
} from '../../utils/index';
import sharp from 'sharp';
describe('isFileExist test suite', () => {
    it('test isFileExist to return true when valid path exist ', async () => {
        const validPath = path.resolve(__dirname, __filename);
        expect(await isFileExist(validPath)).toBeTruthy;
    });
    it('test isFileExist to return false when path not exist ', async () => {
        const invalidPath = path.resolve(__dirname);
        expect(await isFileExist(invalidPath)).toBeFalsy;
    });
});
describe('getRequiredImageSize suite test', () => {
    const image = sharp(path.resolve(pathes.imagePath, 'encenadaport.jpg'));
    it('test valid size to return same size ', async () => {
        expect((await getRequiredImageSize(image, 200, 400)).width).toEqual(
            200
        );
        expect((await getRequiredImageSize(image, 200, 400)).height).toEqual(
            400
        );
    });
    it('test invalid size to return default image size , and string value that can be number to be parsed successfully ', async () => {
        expect(
            (
                await getRequiredImageSize(
                    image,
                    parseInt('asd'),
                    parseInt('400')
                )
            ).width
        ).not.toEqual(parseInt('asd'));
        expect(
            (
                await getRequiredImageSize(
                    image,
                    parseInt('asd'),
                    parseInt('400')
                )
            ).height
        ).toEqual(parseInt('400'));
    });
});

describe('process Image to Png suite', () => {
    it('test valid file name to not throw error', () => {
        expect(
            async () => await processImageToPng('santamonica', 200, 400)
        ).not.toThrow();
    });
});
