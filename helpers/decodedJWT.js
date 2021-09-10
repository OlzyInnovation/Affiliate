const jwt = require('jsonwebtoken');

exports.decoded = (req, res) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(400).json({ success: false, message: 'No Token Found' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    res
      .status(400)
      .json({ success: false, message: 'Invalid Authentication Token' });
  }
  const id = decoded.id;
  return id;
};
