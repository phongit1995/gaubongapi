const  express = require( 'express');
let router = express.Router();
const user = require( './user');
const StoreImage = require('./storeimages');
router.use('/users',user);
router.use('/storeimages',StoreImage)
module.exports = router ;