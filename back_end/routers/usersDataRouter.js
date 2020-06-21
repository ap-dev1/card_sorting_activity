// Tahe user sessions from DynamoTable, to display them in user Dashboard.

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


// Seed the template connection to a new instance of a DocumentClient:
const docClient = new AWS.DynamoDB.DocumentClient({service: DynamoDB});


//----------------------------------------------------------

// data comes from NewActivityPage, when the user clicks Save session.

// we create a new router instance;
const usersDataRouter = require("express").Router();

// the router has to listen to requests coming to it:
// 

// if ithe request is post we write like below.


usersDataRouter.post('/SaveSingleSession', async(request, response) => {
    console.log("body", request.body)
    

    //template for a message to DynamoDB:
    const queryParams = {
        TableName: "user_sessions",
        KeyConditionExpression: "user_email = :email",
        ScanIndexForward: false,
        ExpressionAttributeValues: {":email" : "user@email.com"}
    }
    
    /*  item format:  
        {user_email: "string",
        sessions: [array of objects, {timestamp: unix number, cards: [array of strings]}],

     } 
    */

    const dynamoResponse = await docClient.query(queryParams).promise();
    

    const previousSessions = dynamoResponse.Items[0].sessions

    if (previousSessions !== null) {
        // Pass it to HomePage.js
        // What happens in HomePage? It must be 
        // added to a card-like component. 

    } else {
        const params = {
            TableName: "user_sessions",
            Item: {
                user_email: "one"
            }
        }
        // create row in dynamo and append the current session.
    }

    // console.log("")
    // console.log("dynamoResponse: " , JSON.stringify(dynamoResponse));
    // console.log(previousSessions[0])

    response.write("hahahaha")
    response.end()
} )


// There's nothing requesting this router. The requests go through server js.
// So we need to export this module and use it in server.js

module.exports = {
    usersDataRouter
};