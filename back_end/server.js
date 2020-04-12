const port = 3001
const http = require('http')
const cors = require('cors')
const express = require('express')
const app = express()
const {authRouter} = require('./routers/authRouter.js')

app.use(cors());
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

app.use('/auth', authRouter);

console.log("anything")