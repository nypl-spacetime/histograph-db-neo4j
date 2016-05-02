'use strict'

var config = require('spacetime-config')
var neo4j = require('neo4j')
var db = new neo4j.GraphDatabase(`http://${config.neo4j.host}:${config.neo4j.port}`)
var async = require('async')

function executeQuery (query, params, callback) {
  if (callback === undefined && typeof(params) === 'function') {
    callback = params
  }

  db.cypher({
    query: query,
    params: params
  }, callback)
}

module.exports.query = executeQuery

module.exports.deleteAll = function (callback) {
  var deleteQuery = `
    MATCH n
    WITH n LIMIT 50000
    DETACH DELETE n
    RETURN COUNT(n) AS count;
  `

  var empty = false
  async.whilst(
    () => !empty,
    (callback) => {
      executeQuery(deleteQuery, null, (err, results) => {
        if (err) {
          callback(err)
        } else {
          var count = results[0].count
          empty = (count === 0)
          callback()
        }
      })
    },
    callback
  )
}
