const upload = require('./cloudinary');

module.exports = async (req, image = '') => {
  let img = '';

  if (req.file) {
    await upload(req);

    img = req.body.imageURL !== undefined ? req.body.imageURL : image;

    return img;
  } else {
    return image;
  }
};
