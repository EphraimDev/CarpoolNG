const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const router = express.Router();

const User = require('../models/User');

// @route POST api/users
// @desc Login a user
// @access Public
router.post(
  '/',
  [
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

    const { email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;

          const data = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }

          res.json({ token, data });
        }
      );
    } catch (err) {
      console.log(err)
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
