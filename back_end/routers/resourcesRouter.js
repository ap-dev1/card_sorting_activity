// use SDK to connect to Dynamo;
//Brought this here from authRouter.js

const AWS = require("aws-sdk");
const https = require("https");


// The constructor creates an instance of a DynamoDB connection template.
// This tells it how the connection should look like.
const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  httpOptions: {
    agent: new https.Agent({
      ciphers: "ALL",
      secureProtocol: "TLSv1_method",
    }),
  },
});


// This helps talk to Dynamo in an easier way. 
const docClient = new AWS.DynamoDB.DocumentClient({service: dynamoDB});

//----------------------------------------------------------

const resourcesRouter = require("express").Router();

//the "/resoucres" part was specified in server.js
// .post takes two parameters: the route and a function wuth two argumengs: the request and the response;


resourcesRouter.post('/defaultCards', async (request, response) => { 
  
  //template for a message to DynamoDB:
  const dynamoParams = {
    TableName: "cardsDict",
    KeyConditionExpression: "card_name = :card_name",
    ScanIndexForward: false,
    ExpressionAttributeValues: {":card_name": "default cards"}};

  const dynamoResponse = await docClient.query(dynamoParams).promise();

  const myDeck = dynamoResponse.Items[0].cards;

  response.json(myDeck);
  response.end();
}
  )

module.exports = { resourcesRouter };
