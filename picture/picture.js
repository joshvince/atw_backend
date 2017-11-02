const db = require('../lib/db.js');
const uuidv4 = require('uuid/v4');

async function createPicture(params) {
  console.log(`Trying Dynamo DB...`)
  try {
    await db.create(params, 'Pictures')
    console.log(`That worked: record was ${JSON.stringify(params,null,2)}`)
    return {success: true, result: params};
  } 
  catch (error) {
    console.error(`DDB didn't work: ${error}`)
    return {success: false, result: error};
  }
};

async function getAllPictures(scanParams) {
  try {
    const results = await db.scan(scanParams, 'Pictures')
    console.log(`Results: ${JSON.stringify(results, null, 2)}`)
    return {success: true, result: results};
  } 
  catch (error) {
    console.error(`Error: ${error}`)
    return {success: false, result: error}
  }
}

async function getPicturesByUser(userId) {
  const scanParams = {
    FilterExpression: "#id = :userId",
    ExpressionAttributeNames: {"#id": "userId" },
    ExpressionAttributeValues: {":userId": userId}
  };
  try {
    const results = await db.scan(scanParams, 'Pictures')
    return {success: true, result: results}
  } 
  catch (error) {
    console.error(`Error: ${error}`)
    return {success: false, result: error}
  }
}

function isValidPictureData(params) {
  const validSchema = ["userId", "uuid", "image", "name"];
  return validSchema.every(attr => params.hasOwnProperty(attr))
}

module.exports = {
  create: createPicture,
  getAll: getAllPictures,
  getByUser: getPicturesByUser,
  validate: isValidPictureData
}
