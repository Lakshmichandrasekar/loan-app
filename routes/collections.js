var express = require('express');
var router = express.Router();
const path = require('path');
const jwt_decode = require('jwt-decode'); 

//const adminController = require('../controllers/admin.controller');
const collectionController = require('../controllers/collection.controller');
 

/* Public Routes */
router.get('/collection', collectionController.collectiondetails);  
router.post('/addcollection', collectionController.addcollection); 

router.post('/collection/:id', collectionController.Updatecollection);
router.post('/collection/delete/:id', collectionController.deletecollection);


router.get('/', function(req, res, next) {
    res.send({
        message: "Welcome"
    })
});

module.exports = router;