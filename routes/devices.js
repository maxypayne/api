const express = require('express');
const router = express.Router();
const Device = require('../schemas/device');

router.get('/', (req, res) => {
  Device.find(null, {_id: 0}).then(devices => {
    res.json({ devices });
  }).catch(err => {
    res.json( {
      errMessage: 'Jbs can\'t be find',
      err,
    })
  });
});
router.post('/update', async (req, res) => {
  const { id, status } = req.body;
  const x = await Device.updateOne({id}, {status});
  console.log(x);
  res.json({message: 'Status is updated'});
});

module.exports = router;
