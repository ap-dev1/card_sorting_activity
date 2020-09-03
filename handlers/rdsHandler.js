const Pool = require('pg-pool')
const {DB_CONFIGS} = require('../configs/main_config.js')


const poolInstance = new Pool({
  database: 'dev1',
  user: DB_CONFIGS.RDS_USER,
  password: DB_CONFIGS.RDS_PASSWORD,
  host: DB_CONFIGS.RDS_HOST,
  port: 5432,
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
})

const sqlQuery = async (queryObject) =>{
  const dbResponse = await poolInstance.query(queryObject)
  return dbResponse
}

module.exports = {
  sqlQuery
}