const db = require("../../orclConnection")
require("jsonwebtoken")

async function getDetails(req, res) {
    console.log(req.access_id + " get details of USER")

    const doctorId = req.access_id

    const query = `SELECT FIRST_NAME ||' '||LAST_NAME NAME, EMAIL, GENDER,IMAGE_URL PHOTO_URL,
                    SPECIALIZATION, EXPERIENCE
                    FROM DOCTOR
                    WHERE DOCTOR_ID = '${doctorId}'`

    try {
        const data = await db.executeQuery(query)

        if (data.length === 0)
            return res
                .status(400)
                .json({ success: false, message: "not found" })

        return res.status(200).send(data)
    } catch (error) {
        console.log("error in get details")

        console.log(error)
    }
}

async function getUpcomingAppointments(req, res) {
    console.log(req.access_id + " get upcoming appointments of doctor")
    const doctorId = req.access_id
    
    const query = `SELECT SUBSTR(fa.PATIENT_ID, 2) PATIENT_NID, p.FIRST_NAME||' '||p.LAST_NAME PATIENT_NAME ,
                            TRUNC(MONTHS_BETWEEN(SYSDATE, p.DOB)/12) AGE, p.GENDER, SERIAL_NO,
                            TO_CHAR(fa.APPOINTMENT_DATE,'Day,dd Mon YYYY') APPOINTMENT_DATE, TIME
                            FROM FUTURE_APPOINTMENT fa JOIN PATIENT p
                            ON (fa.PATIENT_ID= p.PATIENT_ID)
                            WHERE DOCTOR_ID = '${doctorId}'
                            AND TO_CHAR(APPOINTMENT_DATE) >= TO_CHAR(SYSDATE)
                            ORDER BY FA.APPOINTMENT_DATE`

    const todayAppointmentNum = `SELECT COUNT(*) TODAY_APPOINTMENT
                                        FROM FUTURE_APPOINTMENT
                                        WHERE TO_CHAR(APPOINTMENT_DATE) = TO_CHAR(SYSDATE)
                                        AND DOCTOR_ID = '${doctorId}'`

    try {

        const todayAppNum = await db.executeQuery(todayAppointmentNum)
        const futureAppointment = await db.executeQuery(query)

        return res.status(200).json({ upcoming: futureAppointment, todayNum: todayAppNum })

    } catch (error) {
        console.log("error in get upcoming appointments")

        console.log(error)
    }
}

async function logOut(req, res) {
    res.cookie("login", "", { httpOnly: true })

    res.json({ success: true })
}

module.exports = {
    getDetails,
    getUpcomingAppointments,
    logOut,
}
