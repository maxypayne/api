const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

router.post('/login', async (req, res, next) => {
  const { body } = req;
  if (body) {
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
        return res.json({ jwt: token, email });
      } else  {
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
    const {email, password, ...rest} = body;
    const findUser =  await User.findOne({email});
    if (!findUser) {
      const hashedPassword = await bcrypt.hash(password, 12);
      if (hashedPassword) {
        const createUser = await new User({email, password: hashedPassword, ...rest}).save();
        if (createUser) {
          return res.json({message: 'User created'});
        }
      } else {
        return res.json({errMessage: 'Bcrypt failed'});
      }
    } else {
      return res.json({errMessage: 'This email already exists'})
    }
  } else {
    return res.json ({errMessage: 'Missing body infos'})
  }
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
      console.log({password});
      console.log({currentPassword});
      console.log({newPassword});
      // const isMatch = true;
      const isMatch = await bcrypt.compare(currentPassword, password).catch(err => console.log(err));
      console.log({isMatch})
      if (isMatch) {
        const hashedPassword = await bcrypt.hashSync(newPassword, 12);
        console.log(hashedPassword)
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        res.json({ message: 'Password was updated successfully' });
      } else {
        res.json({ errMessage: 'Your old password is incorect' });
      }
    } else {
      res.json({errMessage: 'User is undefined'});
    }
  } else {
    console.log('infos problem');
    res.json({errMessage: 'token is missing'});
  }
});
module.exports = router;
