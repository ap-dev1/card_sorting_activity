// const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = '555beast';
let hashedPass;

const testFunction = async() =>{
  hashedPass = await bcrypt.hash(password, saltRounds)
  // console.log("hashed Pass", hashedPass)
  // console.log("hashedPass", hashedPass)
  
  const result = await bcrypt.compare(password, hashedPass)
  // console.log("RESULT", uuid());

  const ttl = new Date().getTime() + 7200000;
  // console.log("manually created password", result)
  // console.log("TTL", ttl)
};

testFunction();