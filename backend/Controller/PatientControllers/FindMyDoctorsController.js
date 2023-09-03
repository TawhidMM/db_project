const db = require("../../orclConnection");

async function getDoctors(req, res) {
    const patientId = req.access_id;

    const query = `SELECT DISTINCT (D.FIRST_NAME || ' ' || D.LAST_NAME) DOCTOR_NAME
                            FROM PAST_APPOINTMENT PA JOIN PRESCRIBED_MEDICINES PM
                            ON PA.APPOINTMENT_ID = PM.APPOINTMENT_ID JOIN DOCTOR D
                            ON PA.DOCTOR_ID = D.DOCTOR_ID
                            WHERE PATIENT_ID = '${patientId}'`;

    try {
        const data = await db.executeQuery(query);

        return res.status(200).send(data);
    } catch (error) {
        console.log("error in get my doctors");

        console.log(error);
    }
}

module.exports = getDoctors;
