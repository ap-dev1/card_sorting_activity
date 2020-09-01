
// What happens here?

//const MNG = require("mongodb");
//console.log("MNG: ",  MNG)



const AWS = require("aws-sdk");
const https = require("https");

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

module.exports = { resourcesRouter };
