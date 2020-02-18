const  express = require( 'express');
const UserControler  =  require('../Controller/UserController');
require('dotenv').config();
const jwt =  require('jsonwebtoken');
let router = express.Router();
router.post('/login',async(req,res)=>{
    console.log(req.body);
    try {
        let userLogin = await UserControler.login(req.body.username,req.body.password);
        console.log(userLogin);
        let token = jwt.sign({cookie:userLogin['cookie']},process.env.KEYJWT);
        userLogin['JWT']=token ;
        return res.json({
            error:null,
            data:userLogin
        })
    } catch (erro) {
        return res.json({
            error:'Tên Tài Khoản Hoặc Mật Khẩu Chưa Chính Sác'
        })
    }
    
})
router.get('/',(req,res)=>{
    res.send('user');
})
module.exports=  router ;