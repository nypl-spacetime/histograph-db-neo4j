var config = require('histograph-config')
var neo4j = require('neo4j')
var db = new neo4j.GraphDatabase(`http://${config.neo4j.host}:${config.neo4j.port}`)

module.exports.query = function (query, params, callback) {
  db.cypher({
    query: query,
    params: params
  }, callback)
}
