const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

const validRequest = (req, res, next) => {
  const requireEmail = Object.keys(req.body).includes('email');
  const requirePassword = Object.keys(req.body).includes('password');
  if (!requireEmail) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!requirePassword) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  next();
};

const validDataRequest = (req, res, next) => {
  const { password, email } = req.body;
  const validEmail = emailRegex.test(email);
  const validPassword = String(password).length >= 6;
  if (!validEmail) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!validPassword) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const gerToken = (req, res, next) => {
  let token = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  res.token = token;
  next();
};

module.exports = {
  validRequest,
  validDataRequest,
  gerToken,
};
