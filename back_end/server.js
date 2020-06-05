const port = 3001
const http = require('http')
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const {authRouter} = require('./routers/authRouter.js')


//const {resourcesRouter} = require('./routers/resourcesRouter.js')
const resourcesRouterModules = require('./routers/resourcesRouter.js')
const resourcesRouter = resourcesRouterModules.x


app.use(cors());  //cors middle-ware that allows the server to respond to cross-origin requests;
app.use(bodyParser.json()); //middle-ware that parses data as JSON;
app.set('port', port);


const server = http.createServer(app); //Creates the frameowrk for the server.

// This is where it becomes a server, when it starts listening.
server.listen(port); 

app.use('/auth', authRouter); //instance of Express; when you get /auth requests, use the router authRouter.
app.use('/resources', resourcesRouter)

console.log("anything")