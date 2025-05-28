const cloudinary = require('cloudinary').v2;
const fs = require('fs');

exports.uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products',
      width: 150,
      crop: 'scale',
    });

    // Remove file from server
    fs.unlinkSync(filePath);

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    // Remove file from server if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

exports.deleteImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw error;
  }
};