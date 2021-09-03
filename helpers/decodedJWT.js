const jwt = require('jsonwebtoken');

exports.decoded = (req, res) => {
  const token = req.header('auth-token');
  // .split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;
  return id;
};
