const express = require('express');

const router = express.Router();
const User = require('../schemas/user');

router.post('/checkEmail', async (req, res) => {
  const { body: { email } } = req;
  const user = await User.findOne({ email });
  const emailExists = !!user;
  res.json({ emailExists });
});

router.post('/checkUsername', async (req, res) => {
  const { body: { username } } = req;
  const user = await User.findOne({ username });
  const usernameExists = !!user;
  res.json({ usernameExists });
});

module.exports = router;
