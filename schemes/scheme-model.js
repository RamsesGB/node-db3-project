const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first();
}

function findSteps(id) {
  return db('steps as s')
    .join('schemes as sch', 's.scheme_id', '=', 'sch.id')
    .where({
      scheme_id: id,
    })
    .select('s.id', 'sch.scheme_name', 's.step_number', 's.instructions')
    .orderBy('step_number');
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then((id) => {
      return findById(id[0]);
    });
}

function update(scheme, id) {
  return db('schemes').where({ id }).update(scheme);
}

// The syntax for this delete function includes a where() method that accepts 2 parameters to dictate which record must be deleted
function remove(id) {
  return db('schemes').where('id', id).del();
}
