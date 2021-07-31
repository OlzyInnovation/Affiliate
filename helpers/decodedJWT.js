exports.decoded = () => {
  const token = req.header('auth-token');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded._id;
  return id;
};
