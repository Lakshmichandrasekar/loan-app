var express = require('express');
var router = express.Router();
const path = require('path');
const jwt_decode = require('jwt-decode'); 

//const adminController = require('../controllers/admin.controller');
const customerController = require('../controllers/customer.controller');

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
 
var upload = multer({ storage: storage });

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'uploads', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|doc)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}) 


//const upload = multvendorlistControllerer({});

// use it before all route definitions

/* Public Routes */
router.get('/customer', customerController.customerdetails); 
router.post('/addcustomer',upload.fields([{name:'image',maxCount: 1},{name:'document',maxCount: 1}]),customerController.addcustomer); 

router.post('/customer/:id',imageUpload.single('image'), customerController.Updatecustomer);
router.post('/customer/delete/:id', customerController.deletecustomer);


router.get('/', function(req, res, next) {
    res.send({
        message: "Welcome"
    })
});

module.exports = router;