const {executeQuery} = require('../../orclConnection')



async function allMedicines(req, res) {
    const query = 'SELECT DISTINCT MEDICINE_NAME NAME FROM MEDICINE ORDER BY NAME'

    try {
        const data = await executeQuery(query)
        console.log(data)

        res.status(200).send(data)
    } catch (error) {
        console.log('error fetching med name')
        console.log(error)
    }
}

async function allDiseases(req, res) {
    const query = 'SELECT DISTINCT DISEASE_NAME FROM DISEASE ORDER BY DISEASE_NAME'

    try {
        const response = await executeQuery(query)

        res.status(200).send(response)
    } catch (error) {
        console.log('error fetching med name')
        console.log(error)
    }
}

async function allTests(req, res) {
    const query = 'SELECT DISTINCT TEST_NAME FROM MEDICAL_TEST ORDER BY TEST_NAME'

    try {
        const response = await executeQuery(query)

        res.status(200).send(response)
    } catch (error) {
        console.log('error fetching med name')
        console.log(error)
    }
}

module.exports = {allMedicines, allDiseases, allTests}

