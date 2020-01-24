const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const upload = require('../utils/multer');
const uploadImage = require('../utils/upload');

dotenv.config();

const secret = process.env.JWT_SECRET;
const auth = require('../middleware/auth');
const router = express.Router();

const User = require('../models/User');

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  '/',
  [
    check('firstName', 'Please add first name')
      .not()
      .isEmpty(),
    check('lastName', 'Please add last name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        secret,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;

          const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id
          };

          res.json({ token, data });
        }
      );
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT api/users/:id
// @desc Update a user info
// @access Public
router.put(
  '/',
  auth,
  upload.single('picture'),
  [
    check('firstName', 'Please add first name')
      .not()
      .isEmpty(),
    check('lastName', 'Please add last name')
      .not()
      .isEmpty(),
    check('address', 'Please add an address')
      .not()
      .isEmpty(),
    check('city', 'Please add a city')
      .not()
      .isEmpty(),
    check('state', 'Please add a state')
      .not()
      .isEmpty(),
    check('phone', 'Please add a phone')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phone, address, city, state } = req.body;
   
    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
      }

      const picture = await uploadImage(req, user.picture);

      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;
      user.address = address;
      user.city = city;
      user.state = state;
      user.picture = picture;

      await user.save();

      return res.json(user);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id).select('-password');
    res.json({ msg: 'Successful' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
