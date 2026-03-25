const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// --- Fail-Safe Check ---
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
  console.error('❌ Cloudinary Error: Missing environment variables. Check your .env file.');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'local_job_board', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
    // Transformation: Resizes to 500x500 to save bandwidth/storage
    transformation: [{ width: 500, height: 500, crop: 'limit' }], 
  },
});

module.exports = { cloudinary, storage };