const  express = require( 'express');
require('dotenv').config();
const logger = require( 'morgan');
const bodyParser = require( 'body-parser');
const router  = require( './src/router/index');
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