const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImage = (imagePath, imageName) => {
  return cloudinary.v2.uploader.upload(imagePath, { public_id: imageName });
}

module.exports = {
  uploadImage
}