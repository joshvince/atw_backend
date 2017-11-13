/* CRUD actions for the user model */
//Environment Variables
const USERS_TABLE_NAME = process.env.USERS_TABLE_NAME

// Dependencies
var db = require('../lib/db');
var uuidv4 = require('uuid/v4');

async function getUserList() {
  try {
    const list = await db.scan({}, USERS_TABLE_NAME)
    console.log(`User list is: ${JSON.stringify(list)}`)
    return list.Items
  } 
  catch (error) {
    console.error(`Error fetching user list: ${JSON.stringify(error)}`)
  }
}

async function createNewUser(userParams) {
  const userUuid = uuidv4();
  const dbObj = Object.assign({}, userParams, {id: userUuid}); 
  try {
    const user = await db.create(dbObj, USERS_TABLE_NAME)
    return dbObj
  } 
  catch (error) {
    console.error(`Could not create the user: ${JSON.stringify(error)}`)
  }
}

async function logIn(request) {
  const userList = await getUserList();
  return userList.find((obj) => obj.id == request) || false;  
}

module.exports = {
  logIn: logIn,
  getUserList: getUserList,
  createNewUser: createNewUser
}
