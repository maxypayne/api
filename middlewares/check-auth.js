const jwt= require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log(req.headers.token);
  try {
    jwt.verify(req.headers['token'], process.env.auth_secret_key);
    next();
  } catch (e) {
    res.json({errMessage: 'auth falied'});
  }
};
