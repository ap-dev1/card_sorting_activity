const createAccountRouter = require("express").Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const uuid = require('uuid/v4');

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://user22:gm3i2jrnmdeY11C9@cluster0.5cuj6.mongodb.net/db1?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });


createAccountRouter.post("/createNewAccount", async (req, res) => {
    const a = req.body.newUserName;
    const b = req.body.newPassword;
    const c = req.body.confirmedPassword;

    await client.connect();

    const database = client.db('db1');
    const colectionUsers = database.collection('valuesSortCardUserAuth');
    const collectionSessions = database.collection('user_sessions');

    const query = { email: a };
    const responseObject = await colectionUsers.findOne(query);


    //  If the user email is not registered and the passwords do match, 
    //      hash password and add user and hashed pass to dynamoDB table:

    if (responseObject == null) {
        console.log("Email okay, not in use.");

        if (b === c) {
            console.log("Passwords match.");

            hashedPass = await bcrypt.hash(b, saltRounds);
            const ttl = new Date().getTime() + 7200000;


            // Authentication table:
            try {
                colectionUsers.insertOne({ email: a, password: hashedPass, token : {ttl:ttl, value: ""} });
            } catch (e) {
                print(e);
            };

            
            // Sessions table: 
            try {
                collectionSessions.insertOne({ sessions:[] , user_email: a  });
            } catch (e) {
                print(e);
            };


            res.write("Thank you for registering.");
            res.end();
        };
    };
}
);


module.exports = {
    createAccountRouter,
};
