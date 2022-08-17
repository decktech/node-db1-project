const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  // const coercedNum = Number(budget);
  if (req.body == null) {
    next({ status: 400, message: 'oh no'});
    
  } else if (name === undefined || budget === undefined) {
    next({ status: 400, message: 'name and budget are required' });

  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: 'name of account must be between 3 and 100'} );

  } else if (isNaN(budget) || typeof budget !== 'number') {
    next({ status: 400, message: "budget of account must be a number" });

  } else if (budget < 0 || budget > 1000000) {
    next({status: 400, message: 'budget of account is too large or too small' });

  } else {
    req.newAccount = {
      name: name.trim(),
      budget: budget
    }
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await Account.getByName(req.body.name)
    if (existing) {
      next({ status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err){
    next(err)
  }
}

exports.checkAccountId = (req, res, next) => {
  Account.getById(req.params.id)
    .then(account => {
      if (account == null) {
        next({ status: 404, message: 'account not found' });
      } else {
        req.existingAccount = account;
        next();
      }
    })
    .catch(err => next(err))
}
