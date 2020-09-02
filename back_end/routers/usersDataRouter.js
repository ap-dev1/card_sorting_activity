// const AWS = require("aws-sdk");
// const https = require("https");


// SAVE NEW ACTIVITY


//const { sqlQuery } = require("../handlers/rdsHandler"); 

// NOTE:
// The RDS functionality was implemented for practice purposes. I commented it out for now
// but I left it here for illustration purposes. 
// same for DynamoDB.


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

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });


// Data comes from NewActivityPage, when the user clicks Save session.
// Create router and update the user's sessions: 
const usersDataRouter = require("express").Router();


usersDataRouter.post('/UpdatedSessions', async (request, response) => {

    const updatedSessions = request.body.sessionData;
    const userEmail = request.body.userEmail;


    // const params = {
    //     TableName: "user_sessions",
    //     Item: {
    //         user_email: userEmail,
    //         sessions: updatedSessions
    //     }
    // };

    await client.connect();
    const database = client.db('db1');
    const collectionSessions = database.collection('user_sessions');


    // docClient.put(params, function(err, data) {
    //     if (err) console.log("err", err);
    //     else console.log("data1: " , data);
    //   });

    try {
        collectionSessions.insertOne({ user_email : userEmail , sessions : updatedSessions });
    } catch (e) {
        print(e);
    };



    response.write("Sessions updated successfully. Thank you for playing.")
    response.end()
})



// --------------------------------  RDS  /  PostgreSQL  --------------------------------


// The RDS functionality was implemented for practice purposes. I commented it out for now
// but I left it here for illustration purposes. 


// usersDataRouter.post('/SaveSession', async(request, response) => {

//     const sessionContent = request.body.sessionContent;
//     const userEmail = request.body.userEmail;
//     const timestamp = request.body.timestamp;

//     console.log("test: ", request.body)

//     const postQuery = {
//         text: `INSERT INTO public.pv_sessions_table(session_content, owner_id,session_time)
//         VALUES ($1, $2, $3) returning *`,
//         values: [
//             sessionContent,
//             userEmail,
//             timestamp
//         ],
//       };

//       const dbResponse = await sqlQuery(postQuery);
//       response.json({ posts: dbResponse.rows });
//       response.end();
// } 
// );



module.exports = {
    usersDataRouter
};