import path from 'path';
const imagePath =  process.env.NODE_ENV == 'development' ? path.resolve(__dirname , '../assets/images')
: path.resolve(__dirname , '../../src/assets/images') 

const thumbsPath = process.env.NODE_ENV == 'development' ? path.resolve(__dirname , '../assets/thumbs')
: path.resolve(__dirname , '../../src/assets/thumbs')

export default { imagePath , thumbsPath }
