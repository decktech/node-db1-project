const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

const getByName = name => {
  return db('accounts').where('name', name).first();
}

const create = async (account) => {
  const [id] = await db('accounts').insert(account);
  return await getById(id)
}

const updateById = (id, account) => {
  return db('accounts')
    .where('id', id)
    .update(account)
    .then(count => (count > 0 ? getById(id) : null))
}

const deleteById = async id => {
  const result = await getById(id);
  await db('accounts').delete().where('id', id);
  return result;
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
