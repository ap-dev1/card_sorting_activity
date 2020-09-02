const createAccountRouter = require("express").Router();
const AWS = require("aws-sdk");
const https = require("https");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const uuid = require('uuid/v4');

// const { sqlQuery } = require("../handlers/rdsHandler"); 

// NOTE:
// The RDS functionality was implemented for practice purposes. I commented it out for now
// but I left it here for illustration purposes. 
// same goes for DynamoDB.


// CREATE NEW ACCOUNT

// const dynamoDB = new AWS.DynamoDB({
//   region: "us-east-1",
//   httpOptions: {
//     agent: new https.Agent({
//       ciphers: "ALL",
//       secureProtocol: "TLSv1_method",
//     }),
//   },
// });

// const docClient = new AWS.DynamoDB.DocumentClient({
//   service: dynamoDB,
// });


const { MongoClient } = require("mongodb");
//const { Console } = require("console");
const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });


createAccountRouter.post("/createNewAccount", async (req, res) => {
    const a = req.body.newUserName;
    const b = req.body.newPassword;
    const c = req.body.confirmedPassword;


    // const dynamoParams = {
    //     TableName: "valuesSortCardUserAuth",
    //     KeyConditionExpression: "email = :e",
    //     ScanIndexForward: false,
    //     ExpressionAttributeValues: {
    //         ":e": a
    // },
    // };

    await client.connect();
    const database = client.db('db1');
    const colectionUsers = database.collection('valuesSortCardUserAuth');
    const collectionSessions = database.collection('user_sessions');


    //const dynamoResponse = await docClient.query(dynamoParams).promise();
    const query = { email: a };

    // const responseObject = dynamoResponse.Items[0];
    const responseObject = await colectionUsers.findOne(query);


    //  If the user email is not registered and the passwords do match, 
    //      hash password and add user and hashed pass to dynamoDB table:


    if (responseObject == null) {
        console.log("Good, the email is not in use.");

        if (b === c) {
            console.log("Good, passwords match.");
            hashedPass = await bcrypt.hash(b, saltRounds);
            const ttl = new Date().getTime() + 7200000;

            console.log("")
            console.log(" ---------------- INSERT DATA IN MONGO DB ---------------  ")
            console.log("")
            console.log("add new user to authentication table:")
            console.log("")

            // Authentication table:
            // const params = {
            //     TableName: "valuesSortCardUserAuth",
            //     Item: {
            //         email: a,
            //         password: hashedPass,
            //         token: { ttl: ttl, value: "" },
            //     }
            // };


            // docClient.put(params, function (err, data) {
            //     if (err) console.log("err", err);
            //     else console.log("account created");
            // });


            try {
                colectionUsers.insertOne({ email: a, password: hashedPass, token : {ttl:ttl, value: ""} });
            } catch (e) {
                print(e);
            };


            console.log("")
            console.log("DID IT SAVED THE NEW USER?")
            console.log("")


            // ____________________________________________________________________________________________
            // 
            // Sessions table: 

            // const paramsSessions = {
            //     TableName: "user_sessions",
            //     Item: {
            //         sessions: [],
            //         user_email: a,
            //         password: hashedPass,
            //         token: { ttl: ttl, value: "" },
            //     }
            // };

            // docClient.put(paramsSessions, function (err, data) {
            //     if (err) console.log("err", err);
            //     else console.log("previous sessions added");
            // });

            try {
                collectionSessions.insertOne({ sessions:[] , email: a, password: hashedPass, token : {ttl:ttl, value: ""} });
            } catch (e) {
                print(e);
            };

            console.log("")
            console.log("SESSIONS TABLE..?")
            console.log("")

            // ____________________________________________________________________________________________
            res.write("Thank you for registering.");
            res.end();
        };
    };
}
);

// --------------------------------  RDS  /  PostgreSQL  --------------------------------


// The RDS functionality was implemented for practice purposes. I commented it out for now
// but I left it here for illustration purposes. 


// createAccountRouter.post('/createNewAccountRDS', async(request, response) => {

//     const newUserEmail = request.body.newUserName;

//     console.log("RDS, newUserEmail: ", newUserEmail)
//     console.log("RDS, newUserEmail: ", request.body)

//     //   CONDITIONS, SEE ABOVE.


//     const postQuery = {
//         text: `INSERT INTO public.pv_users_table(email)
//         VALUES ($1) returning *`,
//         values: [newUserEmail],
//       };

//       const dbResponse = await sqlQuery(postQuery);
//       response.json({ posts: dbResponse.rows });
//       response.end();

//     } 
// );


module.exports = {
    createAccountRouter,
};
