const authRouter = require("express").Router();
const AWS = require("aws-sdk");
const https = require("https");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuid = require('uuid/v4');

const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  httpOptions: {
    agent: new https.Agent({
      ciphers: "ALL",
      secureProtocol: "TLSv1_method",
    }),
  },
});
const docClient = new AWS.DynamoDB.DocumentClient({
  service: dynamoDB,
});

authRouter.post("/login", async (req, res) => {
  const authorizationName = req.body.authorization;
  const password = req.body.password;
  const dynamoParams = {
    TableName: "valuesSortCardUserAuth",
    KeyConditionExpression: "email = :e",
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ":e": authorizationName,
    },
  };

  const dynamoResponse = await docClient.query(dynamoParams).promise();
  const userObject = dynamoResponse.Items[0];
  const authenticationResult = await bcrypt.compare(password, userObject.password);
  if (authenticationResult){  // hashed password on dynamo is the same as the unhashed sent by user
    const ttl = new Date().getTime() + 60000;
    const newToken = {
      value: uuid(),
      ttl
    }

    const dynamoWriteParams = {
      TableName: "valuesSortCardUserAuth",
      Key: { 'email': userObject.email},
      UpdateExpression: "set #tk = :newToken",
      ExpressionAttributeValues: {
        ":newToken" : newToken
      },
      ExpressionAttributeNames:{
        "#tk": "token"
      },
      ScanIndexForward: false,
      Limit: 1
    };

    try{
      const dynamoWrite = await docClient.update(dynamoWriteParams).promise();
      res.write(
        JSON.stringify({ status: 200, token: newToken.value })
      );
      res.end();
    }
    catch(err){
      console.log("Error authRouter.get", err);
      res.write(
        JSON.stringify({ status: 500, message: 'Internal error' })
      );
      res.end();
    }
  }
  else{
    res.write(
      JSON.stringify({ status: 401, message: "Unauthorized" })
    );
    res.end();
  }
});

authRouter.post("/tokenAuthenticate", async(req,res) =>{
  const authorizationName = req.body.authorizationName
  const submittedTokenValue = req.body.token
  const dynamoParams = {
    TableName: "valuesSortCardUserAuth",
    KeyConditionExpression: "email = :e",
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ":e": authorizationName,
    },
  };

  const dynamoResponse = await docClient.query(dynamoParams).promise();
  console.log("dynamoResponse". dynamoResponse)
  const storedTokenValue = dynamoResponse.Items[0].token.value;
  const storedTokenTTL = dynamoResponse.Items[0].token.ttl
  const now = new Date().getTime()
  if (submittedTokenValue === storedTokenValue && storedTokenTTL > now){
    res.status(200)
    res.write(
      JSON.stringify({ status: 200})
    );
    res.end();
  }
  else if(submittedTokenValue !== storedTokenValue) {
    res.status(200)
    res.write(
      JSON.stringify({ status: 401, message: "Unauthorized. Get the hell out of here" })
    );
    res.end();
  }
  else if(storedTokenTTL <= now) {
    res.status(200)
    res.write(
      JSON.stringify({ status: 440, message: "Session expired, please relogin" })
    );
    res.end();
  }

})

module.exports = {
  authRouter,
};
