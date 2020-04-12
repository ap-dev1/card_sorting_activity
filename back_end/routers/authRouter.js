const authRouter = require('express').Router();
const AWS = require('aws-sdk');
const https = require('https')


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


authRouter.get('/', async (req,res)=>{
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

module.exports ={
  authRouter
}