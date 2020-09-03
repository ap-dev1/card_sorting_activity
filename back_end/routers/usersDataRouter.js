// Saves data comming from NewActivityPage, Save Session.

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });


// Create router and update the user's sessions: 
const usersDataRouter = require("express").Router();

usersDataRouter.post('/UpdatedSessions', async (request, response) => {

    const updatedSessions = request.body.sessionData;
    const userEmail = request.body.userEmail;

    await client.connect();

    const myDB = client.db('db1');
    const myCLC = myDB.collection('user_sessions');

    // create the filter/query to find the record: 
    const filter = { user_email: userEmail }; // (I called this "query" )

    // create a document that sets the new value for [sessions]:
    const updateDoc = {
        $set: { sessions: updatedSessions },
    };

    const result = await myCLC.updateOne(filter, updateDoc);

    // tell the client is going to be okay:
    response.write("Sessions updated successfully. Thank you for playing.")
    response.end()
})


module.exports = {
    usersDataRouter
};