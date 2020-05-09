const express = require('express');
const router = express.Router();
const Job = require('../schemas/job');

router.post('/create', (req, res, next) => {
  const { body: { name } } = req;
  const job = new Job({ name });
  job.save().then(resposne => {
    if(resposne) {
      res.json({succes: 'Job is created succesfully'});
    } else {
      res.json({errMessage: 'Job creation failed'});
    }
  })
});
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
router.delete('/:id', async (req, res) => {
  const { params:  { id } } = req;
  const transformId = Number(id);
  const job = await Job.findOne({ id: transformId }).catch(err => {
    res.json({
      errMessage: 'error',
      err,
    })
  });
  if (job) {
    const { _id } = job;
    Job.deleteOne({ _id }).then((response) => {
      res.json({
        succes: 'Documet is deleted successfuly',
        response,
      });
    }).catch(err => {
      res.json( {
        errMessage: 'Jbs can\'t be find',
        err,
      })
    });
  } else {
    res.json({errMessage: 'Job with this id doesn\'t exist'});
  }
});
router.post('/update', async (req, res, next) => {
  const { body: { name } } = req;
  const updated = await Job.updateOne({ company:  'Photosnap'}, { postedAt: '2 day ago'});
  console.log({updated});
  res.json({succes: 'Job is updated succesfully'});
});

module.exports = router;
