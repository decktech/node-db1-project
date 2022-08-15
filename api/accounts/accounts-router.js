const router = require('express').Router();
const Account = require('./accounts-model');
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const data = await Account.getAll() 
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.existingAccount);
})

router.post('/', async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try { 
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
