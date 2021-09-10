const crypto = require('crypto');
const User = require('../models/User');

const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.users = async (req, res, next) => {
  try {
    const accounts = await User.find();

    res.send(accounts);
  } catch (error) {
    next(error);
  }
};
