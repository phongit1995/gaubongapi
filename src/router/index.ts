import * as express from 'express';
let router = express.Router();
import user from './user';
router.use('/user',user);
export default router ;