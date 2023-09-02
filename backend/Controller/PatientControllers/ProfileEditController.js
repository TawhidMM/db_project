const {executeQuery} = require("../../orclConnection");

async function editProfile(req, res) {
    console.log(req.access_id + " get medicine of USER");

    const patientId = req.access_id;

    const query = `SELECT FIRST_NAME, LAST_NAME, EMAIL, GENDER, DOB BIRTH_DATE,
                                STREET_ADDRESS, CITY, POSTAL_CODE, SUB_DISTRICT, DISTRICT
                          FROM PATIENT P NATURAL JOIN ADDRESS D
                          WHERE PATIENT_ID = '${patientId}' `

    try {
        const data = await executeQuery(query)

        return res.status(200).json(data)
    } catch (error) {

        console.log(error)
        console.log("error in getMedicine")
    }
}

module.exports = editProfile
