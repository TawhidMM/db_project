const {executeQuery} = require("../../orclConnection")


async function getTests(req, res) {
    const appointmentId = req.query.app_id

    const query = `SELECT MT.TEST_NAME
                        FROM SUGGESTED_TESTS ST JOIN MEDICAL_TEST MT
                        on ST.TEST_ID = MT.TEST_ID
                        WHERE ST.APPOINTMENT_ID = '${appointmentId}'
                        AND ST.RESULT_ID IS NULL`

    try {
        const response = await executeQuery(query)

        res.status(200).send(response)
    } catch (error) {
        console.log('error fetching test names name')
        console.log(error)
    }
}


async function getTestParams(req, res) {
    console.log(req.body)
    const {selectedTest} = req.body

    const query = `SELECT TP.PARAMETER_NAME, ATP.UNIT
                        FROM MEDICAL_TEST MT JOIN TEST_PARAMETER TP ON
                        MT.TEST_ID = TP.TEST_ID JOIN ALL_TEST_PARAMETERS ATP
                        ON TP.PARAMETER_NAME = ATP.PARAMETER_NAME
                        WHERE MT.TEST_NAME = '${selectedTest}'`

    try {
        const data = await executeQuery(query)

        return res.status(200).send(data)
    } catch (error) {
        console.log("error in getting test params")

        console.log(error)
    }
}

async function submitTestResult(req, res){
    const hospitalId = req.access_id
    const {appointmentId, selectedTest, testParams} = req.body

    let query = `SELECT MAX(RESULT_ID) + 1 NEW_RESULT_ID FROM TEST_RESULT`

    try {
        const data = await executeQuery(query)
        const {NEW_RESULT_ID} = data[0]

        await addToTestResultTable(appointmentId, NEW_RESULT_ID, hospitalId, selectedTest)
        await addResultValue(NEW_RESULT_ID, testParams)

        return res.status(200).send()

    } catch (error) {
        console.log("error in getting test params")

        console.log(error)
    }
}

async function addToTestResultTable(appointmentId, resultId, hospitalId, testName) {
    const sql = `BEGIN 
                            ADD_TEST_RESULT(${appointmentId}, ${resultId}, 
                                    '${hospitalId}', '${testName}');
                        END;`
    try {
        const data = await executeQuery(sql)

    } catch (error) {
        console.log("error in uploading test result")

        throw error
    }
}

async function addResultValue(resultId, testParams) {
    testParams.map(async p => {
        let remark = ''
        if(p.REMARKS)
            remark = p.REMARKS

        const sql = `INSERT INTO TEST_RESULT_VALUES(RESULT_ID, PARAMETER_NAME, RESULT_VALUE, REMARKS)
                            VALUES (${resultId}, '${p.PARAMETER_NAME}', '${p.RESULT}', '${remark}')`

        try {
             await executeQuery(sql)

        } catch (error) {
            console.log("error in uploading test result values")
            throw error
        }
    })

}

// TRIGGER ADDED dhur

module.exports = {getTests ,getTestParams, submitTestResult}

