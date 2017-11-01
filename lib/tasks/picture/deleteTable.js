var AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-1"
  // endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();

var DELETEPARAMS = {
  TableName: 'Pictures'
}

dynamodb.deleteTable(DELETEPARAMS, (err, data) => {
  err ? console.error(err) : console.log(`Table Deleted: ${JSON.stringify(data, null, 2)}`)
})

