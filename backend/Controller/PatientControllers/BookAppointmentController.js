const {executeQuery} = require("../../orclConnection")


async function bookAppointment(req, res) {
    const patientId = req.access_id
    const appInfo = req.body

    console.log(req.body)

    const query = `BEGIN
                            BOOK_APPOINTMENT('${patientId}', '${appInfo.NAME}', 
                            '${appInfo.MED_CENTER}', '${appInfo.DATE}');
                        END;`

    try {
        await executeQuery(query)

        res.status(200).send('success')
    } catch (error) {
        console.log('error booking appointment')
        console.log(error)
    }
}

module.exports = bookAppointment
