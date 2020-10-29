const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const userId = req.session.user._id;
    cb(null, `src/static/uploads/${userId}`);
  },

  filename(req, file, cb) {
    cb(null, `${file.fieldname}--${file.originalname}`);
    // modified here or user file.mimetype
  },
});

module.exports = {
  upload: multer({ storage }),
};
