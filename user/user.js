/* CRUD actions for the user model */
var db = require('../lib/db');
var uuidv4 = require('uuid/v4');

async function getUserList() {
  try {
    const list = await db.scan({}, 'Users')
    return list.Items
  } 
  catch (error) {
    console.error(`Error fetching user list`)
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
    console.error(`Could not create the user...`)
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

// createNewUser({name: "Josh"}).then(res => { console.log(`NewUser: ${JSON.stringify(res)}`)})

// logIn({id: "6fb8e9c1-88f9-47b5-8e02-7b9a7e66917f"}).then(res => {console.log(`User found ${JSON.stringify(res)}`)})

