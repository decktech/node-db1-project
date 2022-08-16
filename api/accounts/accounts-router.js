const router = require('express').Router();
const Account = require('./accounts-model');
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const data = await Account.getAll() 
    res.json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving accounts' })
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.existingAccount);
})

router.post('/', checkAccountPayload, checkAccountNameUnique ,async (req, res, next) => {
  try {
    const data = await Account.create(req.newAccount)
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating account' })
  }
})

router.put('/:id', checkAccountId ,checkAccountPayload, async (req, res, next) => {
  try {
    const data = await Account.updateById(req.params.id, req.newAccount)
    res.json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating account' })
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Account.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting account' })
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
