var express = require('express');
var router = express.Router();

const dashboardController = require('../controllers/dashboard.controller');

router.get('/dashboard', dashboardController.dashboarddetails);

router.get('/', function(req, res, next) {
    res.send({
        message: "Welcome"
    })
});

module.exports = router;