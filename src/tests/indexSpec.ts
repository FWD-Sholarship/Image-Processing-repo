import sharp from 'sharp';
import supertest from 'supertest';
import messages from '../enmus/messages';
import app from '../index';
const request = supertest(app);
describe('image route test', () => {
    it('image route with valid filename response is 200', async (): Promise<void> => {
        const response = await request.get(
            '/api/image?filename=icelandwaterfall'
        );
        expect(response.status).toBe(200);
    });
    it('image route with exist image path to return image type and header Cache-Control', async (): Promise<void> => {
        const response = await request.get('/api/image?filename=encenadaport');
        expect(response.header['cache-control']).toBe('max-age=604800');
        expect(response.type).toBe('image/png');
    });
    it('image route size to be as sent as request', async (): Promise<void> => {
        const response = await request.get(
            '/api/image?filename=encenadaport&width=200&height=200'
        );
        const image = sharp(response.body as Buffer);
        const meta = await image.metadata();
        expect(meta.width).toBe(200);
        expect(meta.height).toBe(200);
    });
    it('image route with non exist image path to return non exist message', async (): Promise<void> => {
        const response = await request.get('/api/image?filename=notexistfile');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(messages.NotExistMessage);
    });
});
