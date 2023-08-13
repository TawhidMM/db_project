const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT ;

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
        const connection = await oracledb.getConnection(
            /*user: 'medical',
            password: '12345',
            connectString: 'localhost/orclpdb'*/
        )

        const result =  (await connection.execute(query)).rows

        console.log(result)

        await connection.close()

        return result
    }
    catch (error) {
        console.log(error)
    }
}

module.exports.executeQuery = executeQuery
module.exports.createPool = createConnectionPool
//sdgsg