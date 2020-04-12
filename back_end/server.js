const port = 3001
const http = require('http')
const https = require('https')
var cors = require('cors')
var express = require('express')
var app = express()
app.use(cors())
app.set('port', port)
var server = http.createServer(app);
const AWS = require('aws-sdk');
server.listen(port);

const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  httpOptions: {
    agent: new https.Agent({
      ciphers: 'ALL',
      secureProtocol: 'TLSv1_method'
    })
  }
})
const docClient = new AWS.DynamoDB.DocumentClient({
  service: dynamoDB
})



app.get('/', (req, res)=>{
  const authorizationName = req.headers.authorization;
  const password = req.headers.password

  const dynamoParams = {
    TableName: 'valuesSortCardUserAuth',
    KeyConditionExpression: 'email = :e',
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ':e': authorizationName
    }
  }

    docClient.query(dynamoParams, (err, data)=>{
        console.log("Creds", authorizationName, password, data)
        res.write(JSON.stringify({"status": `User found, we don't hate you, ${data}`}))
        res.end();
    })
})

console.log("anything")