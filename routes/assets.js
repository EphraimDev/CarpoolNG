const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const upload = require('../utils/multer');
const uploadImage = require('../utils/upload');
const router = express.Router();

const Asset = require('../models/Asset');

// @route POST api/assets
// @desc Add an asset
// @access Private
router.post(
  '/',
  auth,
  upload.single('picture'),
  [
    check('brand', 'Please add a brand name')
      .not()
      .isEmpty(),
    check('model', 'Please add a model name')
      .not()
      .isEmpty(),
    check('year', 'Please add a year')
      .not()
      .isEmpty(),
    check('plateNumber', 'Please add a plate number')
      .not()
      .isEmpty(),
    check('color', 'Please add a color')
      .not()
      .isEmpty(),
    check('capacity', 'Please add asset capacity')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { brand, model, year, plateNumber, color, capacity } = req.body;

    try {
      let asset = await Asset.findOne({ plateNumber });

      if (asset) {
        return res.status(400).json({ msg: 'Asset already exists' });
      }

      const picture = await uploadImage(req);

      asset = new Asset({
        owner: req.user.id,
        brand,
        model,
        year,
        plateNumber,
        color,
        capacity,
        picture
      });

      await asset.save();

      res.json({ asset });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route GET api/assets
// @desc Fetch all assets belonging to the user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    let assets = await Asset.find({ owner: req.user.id });

    res.json({ assets });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route GET api/assets/{id}
// @desc Get an asset
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    let asset = await Asset.findById(id);

    res.json({ asset });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route PUT api/assets/id
// @desc Update an asset
// @access Private
router.put(
  '/:id',
  auth,
  upload.single('picture'),
  [
    check('brand', 'Please add a brand name')
      .not()
      .isEmpty(),
    check('model', 'Please add a model name')
      .not()
      .isEmpty(),
    check('year', 'Please add a year')
      .not()
      .isEmpty(),
    check('plateNumber', 'Please add a plate number')
      .not()
      .isEmpty(),
    check('color', 'Please add a color')
      .not()
      .isEmpty(),
    check('capacity', 'Please add asset capacity')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { brand, model, year, plateNumber, color, capacity } = req.body;
    const { id } = req.params;

    try {
      let asset = await Asset.findById(id);

      if (!asset) {
        return res.status(400).json({ msg: 'Asset does not exist' });
      }

      const picture = await uploadImage(req, asset.picture);

      asset.brand = brand;
      asset.model = model;
      asset.year = year;
      asset.plateNumber = plateNumber;
      asset.color = color;
      asset.capacity = capacity;
      asset.picture = picture;

      await asset.save();

      let assets = await Asset.find({ owner: req.user.id });

      res.json({ assets });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route GET api/assets/{id}
// @desc Get an asset
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Asset.findByIdAndDelete(id);

    res.json({ msg: 'Asset has been deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
