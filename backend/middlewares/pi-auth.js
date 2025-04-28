const jwt = require('jsonwebtoken');

const authenticatePiUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.PI_API_SECRET, { algorithms: ['ES256'] });
    req.piUser = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { authenticatePiUser };
