// AUTHENTICATION

const authRouter = require("express").Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const { MongoClient } = require("mongodb");
// const { Console } = require("console");

const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });

console.log("inside authRouter, after client, line 11. 'client' is type ", typeof(client), ".")

authRouter.post("/login", async (req, res) => {

    const authorizationName = req.body.authorization;
    const password = req.body.password;

    await client.connect();
    const database = client.db('db1');
    const collection = database.collection('valuesSortCardUserAuth');
    
    const query = { email: authorizationName };

    const userObject = await collection.findOne(query);

    console.log("authRouter, userObject: ", userObject)

    const authenticationResult = await bcrypt.compare(password, userObject.password);

    if (authenticationResult) {  // hashed password on dynamo is the same as the unhashed sent by user

        const ttl = new Date().getTime() + 6000000;

        const newToken = {
            value: uuid(),
            ttl
        }

        const db1 = client.db('db1');
        const clc1 = db1.collection('valuesSortCardUserAuth');
       
       
        const updateMongo = await clc1.updateOne(
            { email: userObject.email },
            {
                $set: { token: newToken }
            }
        );
        
        console.log("Token updated: ", updateMongo.matchedCount, updateMongo.modifiedCount)
        

        res.write(
                    JSON.stringify({ status: 200, token: newToken.value })
                );
        res.end();
    }


    else {
        res.write(
            JSON.stringify({ status: 401, message: "Unauthorized" })
        );
        res.end();
    }
});

// The password matched and the authentication token was updated.
// Monitor the time to live:

authRouter.post("/tokenAuthenticate", async (req, res) => {
    const authorizationName = req.body.authorizationName
    const submittedTokenValue = req.body.token

    await client.connect();

    const database = client.db('db1');
    const collection = database.collection('valuesSortCardUserAuth');

    const query = { email: authorizationName };
    const userObject = await collection.findOne(query);

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
