const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const adminUser = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  };

  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
};
