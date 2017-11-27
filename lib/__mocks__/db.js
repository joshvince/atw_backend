/* Mock CRUD actions for interacting with a DB */

/* Operations */

function createItem(item, tableName) {
  return new Promise((resolve, reject) => {
    resolve(item)
  });
}

function getItem(primaryKeys, tableName) {
  return new Promise((resolve, reject) => {
    resolve({})
  });
}

function scan(params, tableName) {
  return new Promise((resolve, reject) => {
    resolve({Items: []})
  });
}

function query(params, tableName) {
  return new Promise((resolve, reject) => {
    resolve({Items: []})
  });
}

function deleteItem(primaryKeys, tableName) {
  return new Promise((resolve, reject) => {
    resolve('ok')
  });
}

module.exports = {
  create: createItem, 
  get: getItem,
  delete: deleteItem,
  scan: scan,
  query: query
}
