// const port = 3001; see line 28-ish;

const http = require('http')
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');


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
// app.set('port', port);

app.set('port', process.env.PORT || 3001)
//const port = process.env.PORT || 3001;

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


/* 
Thanks Isaac. I figured out the issue. 

1) Instead of    app.use('/mychurch', require('./routes/members')); //home route. 

2) I needed      app.use('/', require('./routes/members')); 

Thank you for your help and time. 
 */

// Start listening:
server.listen(process.env.PORT || 3001);
console.log("");
console.log("I'm listening, you may proceed.")
console.log("");