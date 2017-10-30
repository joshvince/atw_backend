const db = require('../lib/db.js');
const uuidv4 = require('uuid/v4');
const imageUploader = require('../lib/imageUploader.js');

/* 
  Upload the image to S3 and then create a record in the Database. 
  This is an ASYNCHRONOUS function which means it will wait for 
  the various operations (such as uploading to S3 and adding to Dynamo)
  before returning any value.
*/
async function createPicture(params) {
  console.log(`Trying S3...`)
  try {
    const imageUrl = await imageUploader(params.image)
    const fullParams = createDbObject(params, imageUrl)
    console.log(`Trying Dynamo DB...`)
    try {
      await db.create(fullParams, 'Pictures')
      console.log(`That worked: record was ${JSON.stringify(fullParams,null,2)}`)
      return {success: true, result: fullParams};
    } 
    catch (error) {
      console.error(`DDB didn't work: ${error}`)
      return {success: false, result: error};
    }
  } 
  catch (error) {
    console.error(`S3 didn't work: ${error}`)
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

function isValidPictureData(params) {
  return params.hasOwnProperty("name") && params.hasOwnProperty("image")
}

// Private functions

function createDbObject(originalParams, imageUrl) {
  // delete the original image params
  delete originalParams.image
  // add in the image url and uuid
  return Object.assign(originalParams, {uuid: uuidv4(), image: imageUrl})
}

module.exports = {
  create: createPicture,
  getAll: getAllPictures,
  validate: isValidPictureData
}
