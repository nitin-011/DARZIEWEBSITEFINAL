const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require('dotenv').config({ path: '../.env' });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Util: Converts buffer + mimetype → dataURI
function bufferToDataURI(mimetype, buffer) {
  const base64 = buffer.toString("base64");
  return `data:${mimetype};base64,${base64}`;
}

// ✅ imageUploadUtil now accepts dataURI as arg
async function imageUploadUtil(dataURI) {
  const result = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  return result.secure_url;
}

module.exports = { upload, imageUploadUtil, bufferToDataURI };

