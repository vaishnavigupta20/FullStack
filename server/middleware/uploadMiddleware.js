const multer = require('multer');
const { storage } = require('../config/cloudinary');

// 1. Define File Filter (Security Check)
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// 2. Initialize Multer with Cloudinary Storage
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit to 5MB for mobile users
  },
});

// Export specific upload types
// .single('image') means the frontend must send the file under the key "image"
const uploadSingle = upload.single('image');

module.exports = { uploadSingle };