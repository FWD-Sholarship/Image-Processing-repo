import supertest from "supertest";
import messages from "../enmus/messages";
import app from "../index";
const request = supertest(app);
describe("routes responses" , ()=> {
    it("image route response is 200" , async (done):Promise<void>=>{
        const response = await request.get('/api/images')
        expect(response.status).toBe(200);
        done();
    })
    it("image route with exist image path to return thumb image" , async(done):Promise<void> =>{
        const response = await request.get('/api/images/encenadaport.jpg');
        expect(response.status).toBe(200);
        expect(response.type).toBe('image/png')
    });
    it("image route with non exist image path to return non exist message" , async(done):Promise<void> =>{
        const response = await request.get('/api/images/notexistfile.jpg');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(messages.NotExistMessage)
    });

    it("image route that processed before to response same image without processing it" , async(done):Promise<void> =>{
        const response = await request.get('/api/images/encenadaport.jpg');
        expect(response.status).toBe(200);
    });
})