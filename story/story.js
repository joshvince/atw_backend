/* CRUD actions for stories */
const STORIES_TABLE_NAME = process.env.STORIES_TABLE_NAME
const db = require('../lib/db.js');

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
  getAll: getAllStories,
  createNewStory: createNewStory,
  validate: isValidStoryData
}