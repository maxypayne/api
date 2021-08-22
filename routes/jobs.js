const express = require('express');
const router = express.Router();
const Job = require('../schemas/job');

router.post('/create', async (req, res, next) => {
  const { body: { name } } = req;
  const job = new Job({ name });
  const saved = await job.save().catch(_ => null);
  res.json({ errMessage: saved ? 'Job is created succesfully' :'Job creation failed' });

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
  const job = await Job.findOne({ id: transformId }).catch(_ => null);
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
  res.json({ succes: updated ? 'Job is updated succesfully' : 'Cannot update job' });
});

module.exports = router;
