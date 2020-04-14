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
    const ttl = new Date().getTime() + 7200000;
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
      JSON.stringify({ status: 500, message: "Unauthorized" })
    );
    res.end();
  }
});

module.exports = {
  authRouter,
};
