const express = require('express');
const router = express.Router();
const Image = require('../schemas/image');

router.post('/create', (req, res) => {
  const { body } = req;
  const image = new Image({ ...body });
  image.save().then((response) => {
    console.log({ response });
  });
  res.json({ message: 'image added' });
});
router.get('/', (req, res) => {
  Image.find({}, { _id: 0 }).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json({ err });
  });
});

module.exports = router;
