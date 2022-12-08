var express = require('express');
var router = express.Router();
const applynowController = require('../controllers/applyloan.controller')
 
router.get('/checkloan',  applynowController.applynowdetails); 
router.post('/applyloan',  applynowController.addapplydaily);   
router.get('/getloan',  applynowController.getloandetails); 
router.get('/listloan',  applynowController.listloandetails); 
    


router.get('/', function(req, res, next) {
    res.send({
        message: "Welcome"
    })
}); 

module.exports = router;  