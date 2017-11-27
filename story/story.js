/* CRUD actions for stories */
const STORIES_TABLE_NAME = process.env.STORIES_TABLE_NAME
const db = require('../lib/db.js');

// Fetch one story by its ID
async function getOneStory(storyId) {
  const primaryKey = {"uuid": storyId}
  try {
    const item = await db.get(primaryKey, STORIES_TABLE_NAME)
    return {success: true, result: item.Item};
  } catch (error) {
    console.log(`There was an error getting the story: ${error}`)
    return {success: false, result: error}
  }
}

// Return an array of every single story in the database, regardless of user Id.
async function getAllStories(scanParams) {
  try {
    const results = await db.scan(scanParams, STORIES_TABLE_NAME)
    console.log(`Results: ${JSON.stringify(results, null, 2)}`)
    return {success: true, result: results};
  } 
  catch (error) {
    console.error(`Error: ${error}`)
    return {success: false, result: error}
  }
}

// Fetch all the stories created by the given user and return an array of them.
async function getStoriesByUser(userId) {
  const scanParams = {
    FilterExpression: "#id = :userId",
    ExpressionAttributeNames: {"#id": "userId" },
    ExpressionAttributeValues: {":userId": userId}
  };
  try {
    const results = await db.scan(scanParams, STORIES_TABLE_NAME)
    return {success: true, result: results}
  } 
  catch (error) {
    console.error(`Error: ${error}`)
    return {success: false, result: error}
  }
}

// Create a new story with the given object
// NOTE: validation on this object happens earlier in the flow, we assume this
// is valid.
async function createNewStory(storyObject) {
  try {
    await db.create(storyObject, STORIES_TABLE_NAME)
    console.log(`That worked: story was created`)
    return {success: true, result: storyObject};
  } catch (error) {
    console.error(`DDB didn't work: ${error}`)
    return {success: false, result: error};
  }
}


// Checks a given set of params to ensure that the minimum attributes to create 
// a story are contained inside, returns true or false.
function isValidStoryData(params) {
  const storySchema = [ "userId", "uuid", "title", "subtitle", "steps"]
  const stepSchema = ["headline", "description", "image", "stepKey"]
  return compareKeys(params, storySchema) && params.steps.every(step => {
    return compareKeys(step, stepSchema)
  })
}

// Private Functions

function compareKeys(params, schema) {
  return schema.every(attr => params.hasOwnProperty(attr))
}

module.exports = {
  getOneStory: getOneStory,
  getStoriesByUser: getStoriesByUser,
  getAll: getAllStories,
  createNewStory: createNewStory,
  validate: isValidStoryData
}