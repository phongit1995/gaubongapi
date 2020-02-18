const  express = require( 'express');
let router = express.Router();
const user = require( './user');
router.use('/users',user);
module.exports = router ;