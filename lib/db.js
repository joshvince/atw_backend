/* CRUD actions for interacting with the DB (currently DynamoDB) */

// ENVIRONMENT VARIABLES
const AWS_REGION = process.env.AWS_REGION 
const AWS_ENDPOINT = process.env.AWS_ENDPOINT 

/* Set up AWS and DynamoDB */
var AWS = require("aws-sdk");
AWS.config.update({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT
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

function query(params, tableName) {
  return new Promise((resolve, reject) => {
    params.TableName = tableName;

    docClient.query(params, (err, data) => {
      err ? reject(err) : resolve(data)
    })
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
  scan: scan,
  query: query
}
