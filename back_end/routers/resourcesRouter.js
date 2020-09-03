//  gets the personal values cards: myDeck

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });

const resourcesRouter = require("express").Router();

resourcesRouter.post('/defaultCards', async (request, response) => {
    
    await client.connect();

    const database = client.db('db1');
    const collection = database.collection('collection1');

    const myData = await collection.findOne();
    const myDeck = myData.cards;

    response.json(myDeck);
    response.end();
}
);

module.exports = { resourcesRouter };
