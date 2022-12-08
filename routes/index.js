var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var User = require('../models/user');
const userController = require('../controllers/user.controller')

router.post('/adduser',  userController.adduser); 
router.get('/userdetails',  userController.userdetails); 

 
router.get('/', function(req, res, next) {
    res.send({
        message: "Welcome"
    })
}); 

module.exports = router;  