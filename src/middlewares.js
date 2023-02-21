const validRequest = (req, res, next) => {
  // valid properties requisition
   const requiredProperties = ['email', 'password'];
   if (requiredProperties.every((property) => property in req.body)) {
     next();
   } else {
     res.sendStatus(400);
   }
};

const gerToken = (req, res, next) => {
  // token
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
  gerToken,
};
