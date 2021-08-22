const express = require('express');

const router = express.Router();
const Message = require('../schemas/message');
const mail = require('../tools/mail');

router.get('/:id', (req, res) => {
  console.log(req, res);
  return res.json('here is');
});

router.post('/new', async (req, res) => {
  const { name, email, message } = req.body;
  const toSave = new Message({ name, email, message });
  const saved = await toSave.save().catch(() => null);
  await mail(name, email, message);
  return res.json({ msg: saved ? 'Is ok' : 'non ok' });
});

module.exports = router;
