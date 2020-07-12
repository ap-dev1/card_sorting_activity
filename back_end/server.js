const port = 3001
const http = require('http')
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');


const {authRouter} = require('./routers/authRouter.js')

const {resourcesRouter} = require('./routers/resourcesRouter.js')


const {previousSessionsRouter} = require('./routers/previousSessionsRouter.js')

const {usersDataRouter} = require('./routers/usersDataRouter.js')

// I forgot what this was for:  
// const resourcesRouterModules = require('./routers/resourcesRouter.js')


app.use(cors());  //cors middle-ware that allows the server to respond to cross-origin requests;
app.use(bodyParser.json()); //middle-ware that parses data as JSON;
app.set('port', port);



const server = http.createServer(app); //Creates the frameowrk for the server.

// instance of Express; when you get /auth requests, use the router authRouter, and so on.
app.use('/auth', authRouter); 

// Load personal values cards:
app.use('/resources', resourcesRouter);

// Load previousSessions: 
app.use("/usersData", previousSessionsRouter);

// Save updatedSessions after completing a new activity:
app.use("/usersData", usersDataRouter);


// Start listening:
server.listen(port); 

console.log("I'm listening, you may proceed.")