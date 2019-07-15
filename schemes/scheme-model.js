const db = require('../data/dbConfig');

module.exports = {
  find: function () {
    let query = db('schemes');

    return query.then(schemes => {
      return schemes
    })
  },

  findById: function (id) {
    let query = db('schemes');

    if (id) {
      return query
        .where('id', id)
        .first()
        .then(scheme => {
          return scheme;
        })
    }
  },

  findSteps: function (id) {

    let query = db('schemes');

    return query.where('schemes.id', id).join('steps', 'schemes.id', '=', 'steps.scheme_id')
      .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
      .then(results => {
        console.log(results)
        return results
      })
  },

  add: function (object) {
    let query = db('schemes');

    return query.insert(object).then(([id]) => this.findById(id))
  }


}