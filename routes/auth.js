const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');

router.post('/login', async (req, res, next) => {
  const { body } = req;
  const fields = ['email', 'password'];
  if (body && fields.every(x => body[x])) {
    const { email, password } = body;
    const user = await User.findOne({email}).catch(err => console.log(err));
    if (user) {
      const { _id, username, email, password: userPasssword } = user;
      const isMatch = await bcrypt.compare(password, userPasssword).catch(err => console.log(err));
      if (isMatch) {
        const token = jwt.sign(
          { email, userId: _id, username },
          process.env.AUTH_SECRET_KEY,
          {expiresIn: '24h'}
        );
        return res.json({ token, email, username });
      } else {
        return res.json({errMessage: 'L\'identifiant ou le mot de passe est incorrect'});
      }
    } else {
      return res.json({errMessage: 'no user with this email'});
    }
  } else {
    return res.json({errMessage: 'User infos is missing'});
  }
});
router.post('/signup', async (req, res, next) => {
  const { body } = req;
    if (body) {
      const {email, password, username, ...rest} = body;
      const user = await User.findOne({email});
      if (user && username && user.username === username) return res.json({errMessage: 'Username already exists'});
      if (user && email && user.email === email) return res.json({errMessage: 'This email already exists'});
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 12);
        if (hashedPassword) {
          const createUser = await new User({email, password: hashedPassword, username, ...rest}).save().catch(_ => null);
          return res.json(createUser ? {message: 'User created'} : { errMessage: 'Create user failed' });
        }
        return res.json({errMessage: 'Hash failed'});
      }
  }
  return res.json ({errMessage: 'Missing body infos'})
});
router.get('/userInfos', (req, res) => {
  const { headers: { authorization } } = req;
  const infos = jwtDecode(authorization);
  if (infos) {
    console.log(infos);
    const { email, username }= infos;
    res.json({ email, username });
  } else {
    res.json({errMessage: 'infos not found'});
  }
});
router.post('/checkPassword', async (req, res) => {
  const { headers: { authorization } } = req;
  const infos = jwtDecode(authorization);
  if (infos) {
    const { email } = infos;
    const { body: { currentPassword, newPassword } } = req;
    const user = await User.findOne({email});
    if (user) {
      const {password} = user;
      // const isMatch = true;
      const isMatch = await bcrypt.compare(currentPassword, password).catch(err => console.log(err));
      if (isMatch) {
        const hashedPassword = await bcrypt.hashSync(newPassword, 12);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        res.json({ message: 'Password was updated successfully' });
      } else {
        res.json({ errMessage: 'Your old password is incorect' });
      }
    } else {
      res.json({ errMessage: 'User is undefined' });
    }
  } else {
    res.json({errMessage: 'token is missing'});
  }
});
module.exports = router;
