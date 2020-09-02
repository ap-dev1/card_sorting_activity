//const AWS = require("aws-sdk");
//const https = require("https");


// PREVIOUS SESSIONS

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });


// const DynamoDB = new AWS.DynamoDB({
//     region: "us-east-1",
//     httpOptions: {
//         agent: new https.Agent({
//             cyphers: "ALL",
//             secureProtocol: "TLSv1_method",
//         })
//     }
// });
// const docClient = new AWS.DynamoDB.DocumentClient({service: DynamoDB});

const previousSessionsRouter = require("express").Router();

previousSessionsRouter.post('/PreviousSessionsRouter', async(request, response) => {

    const userEmail = request.body.email;
    //console.log("requested user_email: ", userEmail)

    // const queryParams = {
    //     TableName: "user_sessions",
    //     KeyConditionExpression: "user_email = :email",
    //     ScanIndexForward: false,
    //     ExpressionAttributeValues: {":email" : userEmail}};    
    // const dynamoResponse = await docClient.query(queryParams).promise(); 
    // const previousSessions = dynamoResponse.Items[0].sessions;

    await client.connect();
    const database = client.db('db1');
    const collection = database.collection('user_sessions');
    const query = { user_email: userEmail };

    const myData = await collection.findOne(query);
    const previousSessions = myData.sessions;

    // console.log("------------------------------------------------------------------")
    // console.log("previousSessions: ", previousSessions);
    // console.log("------------------------------------------------------------------")

    response.json(previousSessions);
    response.end();
}
);


module.exports = {
    previousSessionsRouter
};







// // Each session is stored as an array of strings, "cards". To make them 
// // display one under each other, I create one string, with the 
// // new-line symbol - \n - inserted between "values".
// // previousSessions.forEach(item => {
// //     const cardsArray = item.cards
// //     var cardsString = '';
// //     var i;
// //     for (i = 0; i < cardsArray.length; i++) {
// //         cardsString += cardsArray[i] + "\n";
// //     }        
// //     item.cards = cardsString
// // })
