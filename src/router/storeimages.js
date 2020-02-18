const express  = require('express');
require('dotenv').config();
const jwt =  require('jsonwebtoken');
let router = express.Router();
let StoreImageController = require('./../Controller/StoreImageController');
router.post('/',async(req,res)=>{
    let JWT= req.headers.authorization|| req.headers.Authorization ;
    console.log(req.body.page);
    if(!JWT){
        return res.json({
            error:'NOT_AUTHEN'
        })
    }
    let payload = jwt.decode(JWT,process.env.KEYJWT);
    if(!payload){
        return res.json({
            error:'NOT_AUTHEN'
        })
    }
    let {cookie} = payload;
    let result = await StoreImageController.getInFoImages(cookie,req.body.page);
    // console.log(result);
    if(result.length>0){
        return res.json({
            error:null,
            data:result
        })
    }else{
        return res.json({
            error:'Lỗi Khi Lọc'
        })
    }
})
module.exports = router ;