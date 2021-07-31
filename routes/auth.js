const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation,
} = require('../validation/validation');
const sendEmail = require('../utils/sendEmail');

router.post('/register', async (req, res) => {
  // Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) res.status(400).send('Email already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    // res.send(savedUser);
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if emaily exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).send('Invalid Email');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) res.status(400).send('Invalid Password');

  // Create and Assign Token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
});

router.post('/forgotpassword', async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Error processing your request');
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `http://localhost:${process.env.PORT}/passwordreset/${resetToken}`;
    const message = `
    <h1> You have requested a new password reset</h1>
    <p>Visit <a href=${resetUrl} clicktracking=off>here</a> to reset your password</p>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      });
      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save;
      return res.status(500).send('Email could not be sent!');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
