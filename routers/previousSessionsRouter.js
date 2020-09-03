// Loads and displays previous sessions (after logging in and after saving a new activity. 

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });


// Create router:
const previousSessionsRouter = require("express").Router();

previousSessionsRouter.post('/PreviousSessionsRouter', async(request, response) => {

    const userEmail = request.body.email;
    
    await client.connect();
    
    const database = client.db('db1');
    const collection = database.collection('user_sessions');
    const query = { user_email: userEmail };

    const myData = await collection.findOne(query);
    const previousSessions = myData.sessions;

    response.json(previousSessions);
    response.end();
}
);


module.exports = {
    previousSessionsRouter
};
