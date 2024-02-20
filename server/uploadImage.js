const cloudinary = require("cloudinary").v2;

const cloud_name = "dsxzewstf";
console.log(process.env.CLOUD_NAME);
const api_key = 656724592177456;
console.log(process.env.API_KEY);
const api_secret = "hlHhSCZUhuxkd77gpPvcBtVfbbc";
console.log(process.env.API_SECRET);

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

function uploadImage(image) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        resolve(result.secure_url);
      } else {
        console.log(error.message + " failed to upload");
        reject({ message: error.message });
      }
    });
  });
};

module.exports = {
  uploadImage,
  uploadMultipleImages: (images) => {
    return new Promise((resolve, reject) => {
      const uploads = images.map((base) => uploadImage(base));
      Promise.all(uploads)
        .then((values) => resolve(values))
        .catch((err) => reject(err));
    });
  },
};
