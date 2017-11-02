/* CRUD actions for the user model */
var db = require('../lib/db');
var uuidv4 = require('uuid/v4');

async function getUserList() {
  try {
    const list = await db.scan({}, 'Users')
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
    const user = await db.create(dbObj, 'Users')
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
  getUserList: getUserList
}

// createNewUser({name: "Joanna"}).then(res => { console.log(`NewUser: ${JSON.stringify(res)}`)})
