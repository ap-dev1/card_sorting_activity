const createAccountRouter = require("express").Router();
const AWS = require("aws-sdk");
const https = require("https");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuid = require('uuid/v4');


// "connection template":
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


createAccountRouter.post("/createNewAccount", async (req, res) => {
    const a = req.body.newUserName;
    const b = req.body.newPassword;
    const c = req.body.confirmedPassword;


    const dynamoParams = {
        TableName: "valuesSortCardUserAuth",
        KeyConditionExpression: "email = :e",
        ScanIndexForward: false,
        ExpressionAttributeValues: {
            ":e": a
    },
    };

    // await syntax can only be used in an async function. see above;
    const dynamoResponse = await docClient.query(dynamoParams).promise();

    const responseObject = dynamoResponse.Items[0];
    
    //  If the user email is not registered and passwords match, 
    //      encrypt password and add user to dynamoDB table:
    console.log("")
    console.log("responseObject: ", responseObject)

    if (responseObject == null) {
        console.log("The email is not in use.");

        if (b===c) {
            console.log("Passwords match.");

            hashedPass = await bcrypt.hash(b, saltRounds);
            const ttl = new Date().getTime() + 7200000;


            // Update Authentication table: 
            const params = {
                TableName: "valuesSortCardUserAuth",
                Item: {
                    email: a,
                    password: hashedPass,
                    token: { ttl: ttl, value: "" },
                }
            };
        
        
            docClient.put(params, function(err, data) {
                if (err) console.log("err", err);
                else console.log("account created");
              });
               
              

              const paramsSessions = {
                TableName: "user_sessions",
                Item: {
                    sessions: [],
                    user_email: a,
                    password: hashedPass,
                    token: { ttl: ttl, value: "" },
                }
            };
        
        
            docClient.put(paramsSessions, function(err, data) {
                if (err) console.log("err", err);
                else console.log("previous sessions added");
              });
                  

              
            res.write("Thank you for registering.")
            console.log("--------------------------------------------------")
            console.log("")
            res.end()


        };
    };



}
);



module.exports = {
  createAccountRouter,
};
