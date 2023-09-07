const db = require("../../orclConnection")
require("jsonwebtoken")

async function getDoctors(req, res) {
    const patientId = req.access_id
    const speciality = req.query.speciality
    const location = req.query.city

    const query = `SELECT DISTINCT (D.FIRST_NAME || ' ' || D.LAST_NAME) NAME, M.CENTER_NAME MED_CENTER,
                    (A.STREET_ADDRESS || ', ' || A.CITY || ', ' || A.SUB_DISTRICT || ', ' ||A.DISTRICT || '-' || A.POSTAL_CODE) ADDRESS,
                    AVAILABLE_DAYS(D.DOCTOR_ID, M.MED_CENTER_ID) AVAILABLE_DAYS

                    FROM DOCTOR D JOIN DOCTOR_AVAILABILITY DA ON D.DOCTOR_ID = DA.DOCTOR_ID JOIN
                    MEDICAL_CENTER M ON DA.CENTER_ID =M.MED_CENTER_ID JOIN 
                    ADDRESS A ON A.ADDRESS_ID = M.ADDRESS_ID

                    WHERE LOWER( D.SPECIALIZATION ) LIKE LOWER('%${speciality}%')
                    AND LOWER( A.CITY) LIKE LOWER('%${location}%')
                    ORDER BY NAME ASC`

    try {
        const data = await db.executeQuery(query)

        return res.status(200).send(data)
    } catch (error) {
        console.log("error in get my doctors")

        console.log(error)
    }
}

async function getOptions(req, res) {
    console.log("in get options")
    try {
        const allSpeciality = await db.executeQuery(
            "SELECT DISTINCT SPECIALIZATION SPECIALIST FROM DOCTOR"
        )

        const allCity = await db.executeQuery(
            "SELECT DISTINCT CITY FROM ADDRESS ORDER BY CITY ASC"
        )
        return res.status(200).send({ allSpeciality, allCity })
    } catch (error) {
        console.log("error in get my doctors")

        console.log(error)
    }
}

module.exports = { getDoctors, getOptions }
