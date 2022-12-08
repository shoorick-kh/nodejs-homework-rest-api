const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../tmp'),
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = { upload };
