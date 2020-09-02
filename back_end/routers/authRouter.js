const authRouter = require("express").Router();
const AWS = require("aws-sdk");
const https = require("https");
const bcrypt = require('bcryptjs');
//const saltRounds = 10;
const uuid = require('uuid/v4');


// AUTHENTICATION:

const { MongoClient } = require("mongodb");
const { Console } = require("console");
const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });


// const dynamoDB = new AWS.DynamoDB({
//     region: "us-east-1",
//     httpOptions: {
//         agent: new https.Agent({
//             ciphers: "ALL",
//             secureProtocol: "TLSv1_method",
//         }),
//     },
// });
//
//
// const docClient = new AWS.DynamoDB.DocumentClient({
//     service: dynamoDB,
// });


authRouter.post("/login", async (req, res) => {

    const authorizationName = req.body.authorization;
    const password = req.body.password;

    // const dynamoParams = {
    //     TableName: "valuesSortCardUserAuth",
    //     KeyConditionExpression: "email = :e",
    //     ScanIndexForward: false,
    //     ExpressionAttributeValues: {
    //         ":e": authorizationName,
    //     },
    // };

    await client.connect();
    const database = client.db('db1');
    const collection = database.collection('valuesSortCardUserAuth');
    
    // const dynamoResponse = await docClient.query(dynamoParams).promise();
    const query = { email: authorizationName };

    // const userObject = dynamoResponse.Items[0];
    const userObject = await collection.findOne(query);

    // const authenticationResult = await bcrypt.compare(password, userObject.password);
    const authenticationResult = await bcrypt.compare(password, userObject.password);

    if (authenticationResult) {  // hashed password on dynamo is the same as the unhashed sent by user

        const ttl = new Date().getTime() + 6000000;

        const newToken = {
            value: uuid(),
            ttl
        }


        console.log("")
        console.log("authentication result = true;")
        console.log("ttl: ", ttl);
        console.log("newToken.ttl: ", newToken.ttl)
        console.log("newToken.value: ", newToken.value)
        console.log("")


        // UPDATE TOKEN, AWS, DYNAMO-DB:  _______________________________________________________________

        // const dynamoWriteParams = {
        //     TableName: "valuesSortCardUserAuth",
        //     Key: { 'email': userObject.email },
        //     UpdateExpression: "set #tk = :newToken",
        //     ExpressionAttributeValues: {
        //         ":newToken": newToken
        //     },
        //     ExpressionAttributeNames: {
        //         "#tk": "token"
        //     },
        //     ScanIndexForward: false,
        //     Limit: 1
        // };

        console.log("")
        console.log("_______________________  UPDATE TOKEN WITH MONGO  ___________________________________________")
        console.log("")


        const db1 = client.db('db1');
        const clc1 = database.collection('valuesSortCardUserAuth');
       
       
        const updateMongo = await clc1.updateOne(
            { email: userObject.email },
            {
                $set: { token: newToken }
            }
        );
        
        console.log("Token updated: ", updateMongo.matchedCount, updateMongo.modifiedCount)
        console.log("")

        res.write(
                    JSON.stringify({ status: 200, token: newToken.value })
                );
        res.end();
        

        // try {
        //     const dynamoWrite = await docClient.update(dynamoWriteParams).promise();
        //     res.write(
        //         JSON.stringify({ status: 200, token: newToken.value })
        //     );
        //     res.end();
        // }
        // catch (err) {
        //     console.log("Error authRouter.get", err);
        //     res.write(
        //         JSON.stringify({ status: 500, message: 'Internal error' })
        //     );
        //     res.end();
        // }
    }


    else {
        res.write(
            JSON.stringify({ status: 401, message: "Unauthorized" })
        );
        res.end();
    }
});

// The password matched and the authentication token was updated.



authRouter.post("/tokenAuthenticate", async (req, res) => {
    const authorizationName = req.body.authorizationName
    const submittedTokenValue = req.body.token


    // const dynamoParams = {
    //     TableName: "valuesSortCardUserAuth",
    //     KeyConditionExpression: "email = :e",
    //     ScanIndexForward: false,
    //     ExpressionAttributeValues: {
    //         ":e": authorizationName,
    //     },
    // };


    await client.connect();
    const database = client.db('db1');
    const collection = database.collection('valuesSortCardUserAuth');
    const query = { email: authorizationName };

    const userObject = await collection.findOne(query);

    console.log("")
    console.log("problem solved?: ", userObject.token)
    console.log("")


    // const dynamoResponse = await docClient.query(dynamoParams).promise();
    //console.log("auth Router, dynamo response", dynamoResponse)

    // const storedTokenValue = dynamoResponse.Items[0].token.value;
    // const storedTokenTTL = dynamoResponse.Items[0].token.ttl
    // const now = new Date().getTime()

    const storedTokenValue = userObject.token.value;
    const storedTokenTTL = userObject.token.ttl;
    const now = new Date().getTime();


    if (submittedTokenValue === storedTokenValue && storedTokenTTL > now) {
        res.status(200)
        res.write(
            JSON.stringify({ status: 200 })
        );
        res.end();
    }


    else if (submittedTokenValue !== storedTokenValue) {
        res.status(200)
        res.write(
            JSON.stringify({ status: 401, message: "Unauthorized. Get the hell out of here. submittedTokenValue and stored value are: " + submittedTokenValue + " ; " + storedTokenValue })
        );
        res.end();
    }


    else if (storedTokenTTL <= now) {
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
