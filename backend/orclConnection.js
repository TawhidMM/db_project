const oracledb = require('oracledb')
const errorMsg = require('./Utils/OrclErrorMap')



oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
oracledb.autoCommit = true

async function createConnectionPool() {
    try {
        await oracledb.createPool({
            user: 'medical',
            password: '12345',
            connectString: 'localhost/orclpdb'
        })
    }catch(error) {
        console.log(error)
    }
}
async function executeQuery(query){
    console.log(query)
    try {
        const connection = await oracledb.getConnection()

        const result =  (await connection.execute(query)).rows

        await connection.close()

        return result
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

module.exports.executeQuery = executeQuery
module.exports.createPool = createConnectionPool
