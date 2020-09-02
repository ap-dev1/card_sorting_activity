//const AWS = require("aws-sdk");
//const https = require("https");


//  REASOURCES


const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });


// async function run() {
//     try {
//         await client.connect();
// 
//         const database = client.db('db1');
//         const collection = database.collection('collection1');
// 
//         //const query = { cards: {} };
//         const myData = await collection.findOne();
//         const myMongoDeck = myData.cards;
// 
//         console.log("myMongoDeck: ", myMongoDeck);
// 
//     } finally {
//         await client.close();  // Ensures that the client will close when finish/error.
//     }
// }
// 
// run().catch(console.dir);



// ________________      Amazon stuff     ________________________________________________

/* 

const dynamoDB = new AWS.DynamoDB({
    region: "us-east-1",
    httpOptions: {
        agent: new https.Agent({
            ciphers: "ALL",
            secureProtocol: "TLSv1_method",
        }),
    },
});

const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamoDB });


const resourcesRouter = require("express").Router();

resourcesRouter.post('/defaultCards', async (request, response) => {

    const dynamoParams = {
        TableName: "cardsDict",
        KeyConditionExpression: "card_name = :card_name",
        ScanIndexForward: false,
        ExpressionAttributeValues: { ":card_name": "default cards" }
    };

    const dynamoResponse = await docClient.query(dynamoParams).promise();
    const myDeck = dynamoResponse.Items[0].cards;



    response.json(myDeck);
    response.end();
}
);

 */

// except for this line, replace everything with mongoDB:
const resourcesRouter = require("express").Router();


resourcesRouter.post('/defaultCards', async (request, response) => {
    // const dynamoParams = {
    //     TableName: "cardsDict",
    //     KeyConditionExpression: "card_name = :card_name",
    //     ScanIndexForward: false,
    //     ExpressionAttributeValues: { ":card_name": "default cards" }
    // };
    // const dynamoResponse = await docClient.query(dynamoParams).promise();
    // const myDeck = dynamoResponse.Items[0].cards;

    await client.connect();

    const database = client.db('db1');
    const collection = database.collection('collection1');

    //const query = { cards: {} };
    const myData = await collection.findOne();
    const myMongoDeck = myData.cards;

    //console.log("myMongoDeck: ", myMongoDeck);

    response.json(myMongoDeck);
    response.end();
}
);

module.exports = { resourcesRouter };
