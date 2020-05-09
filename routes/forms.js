const express = require('express');
const router = express.Router();
const Form = require('../schemas/job');

router.get('/', (req, res) => {
  Job.find(null, {_id: 0}).then(jobs => {
    res.json({ jobs });
  }).catch(err => {
    res.json( {
      errMessage: 'Jbs can\'t be find',
      err,
    })
  });
});

module.exports = router;
