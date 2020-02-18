import * as express from 'express';
let router = express.Router();
router.post('/login',(req,res)=>{
    console.log(req.body);
})
router.get('/',(req,res)=>{
    res.send('user');
})
export default router ;