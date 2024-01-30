const multer = require("multer");
const path = require("path");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer instance
const uploadSettings = multer({ storage: storage });
const upload = uploadSettings.single("upfile");

function uploadFile(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({ error: err.message });
    } else {
      // Everything went fine.
      next();
    }
  });
}

module.exports = uploadFile;
