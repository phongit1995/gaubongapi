const  express = require( 'express');
import * as dotenv from 'dotenv';
const logger = require( 'morgan');
const bodyParser = require( 'body-parser');
import router from './src/router/index';
dotenv.config();
let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/',router);
app.get('/',(req,res)=>{
    res.send('phong');
})
app.listen(process.env.PORT,()=>{
    console.log('Start Thành Công Port :' + process.env.PORT);
})