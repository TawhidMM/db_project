const {executeQuery} = require("../../orclConnection")

async function getTestResult(req, res) {
    const appointmentId = req.query.appointment_id
    const testName = req.query.test_name

    const query = `SELECT TR.TEST_DATE, MC.CENTER_NAME, TRV.PARAMETER_NAME,
                               TRV.RESULT_VALUE, ATP.MALE_RANGE, ATP.FEMALE_RANGE,
                               ATP.CHILD_RANGE, TRV.REMARKS
                        FROM SUGGESTED_TESTS ST JOIN MEDICAL_TEST MT
                        ON MT.TEST_ID = ST.TEST_ID JOIN TEST_RESULT TR
                        ON ST.RESULT_ID = TR.RESULT_ID JOIN TEST_RESULT_VALUES TRV
                        ON TR.RESULT_ID = TRV.RESULT_ID JOIN MEDICAL_CENTER MC ON
                        TR.MED_CENTER_ID = MC.MED_CENTER_ID JOIN ALL_TEST_PARAMETERS ATP
                        ON ATP.PARAMETER_NAME = TRV.PARAMETER_NAME
                        WHERE ST.APPOINTMENT_ID = ${appointmentId} AND
                        MT.TEST_NAME = '${testName}'`
    try {
        const data = await executeQuery(query)

        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }

}


module.exports = getTestResult