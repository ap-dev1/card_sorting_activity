const AWS = require("aws-sdk");
const https = require("https");

// Create DynamoDB connection template:
const DynamoDB = new AWS.DynamoDB({
    region: "us-east-1",
    httpOptions: {
        agent: new https.Agent({
            cyphers: "ALL",
            secureProtocol: "TLSv1_method",
        })
    }
});

const docClient = new AWS.DynamoDB.DocumentClient({service: DynamoDB});

const previousSessionsRouter = require("express").Router();


previousSessionsRouter.post('/PreviousSessionsRouter', async(request, response) => {

    const userEmail = request.body.email

    console.log("")
    console.log("previous sessions router, passed userEmail is: ", userEmail)
    console.log("")

    const queryParams = {
        TableName: "user_sessions",
        KeyConditionExpression: "user_email = :email",
        ScanIndexForward: false,
        ExpressionAttributeValues: {":email" : userEmail}};
    
    const dynamoResponse = await docClient.query(queryParams).promise();
        
    const previousSessions = dynamoResponse.Items[0].sessions;

    // Each session is stored as an array of strings, "cards". To make them 
    // display one under each other, I create one string, with the 
    // new-line symbol - \n - inserted between "values".

    // previousSessions.forEach(item => {
    //     const cardsArray = item.cards
    //     var cardsString = '';
    //     var i;
    //     for (i = 0; i < cardsArray.length; i++) {
    //         cardsString += cardsArray[i] + "\n";
    //     }        
    //     item.cards = cardsString
    // })
    
    response.json(previousSessions);
    response.end();
} );


module.exports = {
    previousSessionsRouter
};