var express = require('express');
var router = express.Router();

const cityController = require('../controllers/city.controller');

router.get('/city', cityController.citydetails);
router.post('/addcity', cityController.addcity); 

router.get('/', function(req, res, next) {
    res.send({
        message: "Welcome"
    })
});

module.exports = router;