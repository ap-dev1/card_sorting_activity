// Tahe user sessions from DynamoTable and display them in user Dashboard.
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


// Data comes from NewActivityPage, when the user clicks Save session.
// Create router and "put" updatedSessions in the propper table, propper user:
const usersDataRouter = require("express").Router();


usersDataRouter.post('/UpdatedSessions', async(request, response) => {

    const updatedSessions = request.body.sessionData;
    const userEmail = request.body.userEmail;

    const params = {
        TableName: "user_sessions",
        Item: {
            user_email: "user@email.com",
            sessions: updatedSessions
        }
    };


    // Update dynamo:
    docClient.put(params, function(err, data) {
        if (err) console.log(err);
        else console.log("data1: " , data);
      });
          

    response.write("Sessions updated successfully. Thank you for playing.")
    response.end()
} )


module.exports = {
    usersDataRouter
};