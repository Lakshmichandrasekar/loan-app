const multer = require('multer');



const audiobookStorage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads') },
    filename: (req, file, cb) => { cb(null, file.originalname) }, 
  })
const audiobookFilter = (req, file, cb) => {
if ( file.mimetype == "doc/doc" || file.mimetype == "pdf/pdf" || file.mimetype == "application/zip" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
cb(null, true) } else { cb(null, false)}
}
  
exports.uploadHandler = multer({ storage: audiobookStorage, fileFilter: audiobookFilter })