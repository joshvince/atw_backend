/* CRUD actions for interacting with the DB

  Current implemented as AWS DynamoDB.
  All functions currently return a promise that resolves if the operation
  succeeds and rejects otherwise.

*/

/* Set up AWS and DynamoDB */
var AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-1",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

/* Operations */

function createItem(item, tableName) {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: tableName,
      Item: item
    }
    docClient.put(params, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  });
}

function getItem(primaryKeys, tableName) {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: tableName,
      Key: primaryKeys
    }
  
    docClient.get(params, (err, data) => {
      err ? reject(err) : resolve(data)
    });
  });
}

function scan(params, tableName) {
  return new Promise((resolve, reject) => {
    params.TableName = tableName;

    docClient.scan(params, (err, data) => {
      err ? reject(err) : resolve(data)
    });
  });
}

function deleteItem(primaryKeys, tableName) {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: tableName,
      Key: primaryKeys
    }

    docClient.delete(params, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  });
}

module.exports = {
  create: createItem, 
  get: getItem,
  delete: deleteItem,
  scan: scan
}
