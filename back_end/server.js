const port = 3001
const http = require('http')
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const AWS = require('aws-sdk');
const { AWS_CREDS } = require('./configs/awsCreds.js');

AWS.config.update(AWS_CREDS);

const {authRouter} = require('./routers/authRouter.js')

const {resourcesRouter} = require('./routers/resourcesRouter.js')

const {previousSessionsRouter} = require('./routers/previousSessionsRouter.js')

const {usersDataRouter} = require('./routers/usersDataRouter.js')

const {createAccountRouter} = require('./routers/createAccountRouter.js')

// ???
// const resourcesRouterModules = require('./routers/resourcesRouter.js')
// ???


app.use(cors());             // cors middle-ware; allows the server to respond to cross-origin requests;
app.use(bodyParser.json());  // middle-ware that parses data as JSON;
app.set('port', port);

const server = http.createServer(app);  // the frameowrk for the server.

app.use('/auth', authRouter); 


// load the cards displaying personal values:
app.use('/resources', resourcesRouter);  

// Load previous sessions, if any:
app.use("/usersData", previousSessionsRouter);

// Update sessions:
app.use("/usersData", usersDataRouter);

// New user:
app.use("/auth", createAccountRouter);



// Start listening:
server.listen(port); 
console.log("I'm listening, you may proceed.")