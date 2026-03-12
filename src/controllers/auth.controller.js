const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;

  const adminUser = process.env.ADMIN_USER;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
  }

  if (!adminUser || !adminPasswordHash || !jwtSecret) {
    return res.status(500).json({ error: 'Falta configurar autenticación en el servidor' });
  }

  if (username !== adminUser) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const passwordOk = await bcrypt.compare(password, adminPasswordHash);

  if (!passwordOk) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { username: adminUser, role: 'admin' },
    jwtSecret,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: {
      username: adminUser,
      role: 'admin',
    },
  });
};

module.exports = {
  login,
};