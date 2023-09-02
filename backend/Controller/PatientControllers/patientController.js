const db = require("../../orclConnection");
require("jsonwebtoken");

async function getDetails(req, res) {
    console.log(req.access_id + " get details of USER")

    const patientId = req.access_id

    const query = `SELECT FIRST_NAME ||' '||LAST_NAME FULL_NAME, 
                          EMAIL, GENDER, TO_CHAR(DOB, 'DD MONTH YYYY') DOB, 
                          BLOOD_GROUP, ADDRESS_ID, PHOTO_URL
                          FROM PATIENT
                          WHERE PATIENT_ID = '${patientId}'`

    try {
        const data = await db.executeQuery(query);

        if (data.length == 0)
            return res
                .status(400)
                .json({ success: false, message: "not found" });

        return res.status(200).send(data);
    } catch (error) {
        console.log("error in get details");

        console.log(error);
    }
}

async function getMedicine(req, res) {
    console.log(req.access_id + " get medicine of USER")

    const patientId = req.access_id

    const sinceMonth = req.query.month
    const doctor = req.query.doctor

    console.log(sinceMonth);

    function getQuery(runningMedCondition) {

        return `SELECT  MEDICINE_NAME NAME, DOSAGE_AMOUNT DOSAGE, DOSAGE_FREQUENCY FREQUENCY, DURATION, TIMING ,
                                                (SELECT FIRST_NAME||' '||LAST_NAME
                                                FROM PAST_APPOINTMENT pa LEFT JOIN DOCTOR d ON (pa.DOCTOR_ID=d.DOCTOR_ID)
                                                WHERE pa.APPOINTMENT_ID= p.APPOINTMENT_ID) PRESCRIBED_BY,
                                                TO_CHAR( (SELECT APPOINTMENT_DATE
                                                FROM PAST_APPOINTMENT pa LEFT JOIN DOCTOR d ON (pa.DOCTOR_ID=d.DOCTOR_ID)
                                                WHERE pa.APPOINTMENT_ID= p.APPOINTMENT_ID), 'DD MON YYYY') PRESCRIBED_ON,
                                                m.DESCRIPTION MED_URL

                FROM PRESCRIBED_MEDICINES p LEFT JOIN MEDICINE m ON (p.MEDICINE_ID=m.MEDICINE_ID)
                WHERE p.APPOINTMENT_ID IN ( SELECT APPOINTMENT_ID
                                            FROM PAST_APPOINTMENT A JOIN DOCTOR D2
                                            on A.DOCTOR_ID = D2.DOCTOR_ID
                                            WHERE PATIENT_ID = '${patientId}'
                                            AND (MONTHS_BETWEEN(SYSDATE, APPOINTMENT_DATE)<= ${sinceMonth}
                                                OR GET_NULL(${sinceMonth}) IS NULL )
                                            AND ((D2.FIRST_NAME || ' ' || D2.LAST_NAME) = '${doctor}'
                                            OR GET_NULL('${doctor}') IS NULL )
                                            AND ${runningMedCondition}
                                            )
                                            
                ORDER BY TO_DATE(PRESCRIBED_ON,'DD MON YYYY') DESC, MEDICINE_NAME ASC`
    }

    const runningMedCond = `MED_RUNNING_INDEX(A.APPOINTMENT_DATE,
                                'YYYY-MM-DD', P.DURATION) >= 0`
    const pastMedCond = `MED_RUNNING_INDEX(A.APPOINTMENT_DATE,
                                'YYYY-MM-DD', P.DURATION) < 0`


    try {
        const runningMeds = await db.executeQuery(getQuery(runningMedCond))
        const pastMeds = await db.executeQuery(getQuery(pastMedCond))

        return res.status(200).json({running: runningMeds,
                                     past: pastMeds})
    } catch (error) {
        console.log(error);
        console.log("error in getMedicine");
    }
}


async function logOut(req, res) {
    res.cookie("login", "", { httpOnly: true });

    res.json({ success: true });
}

module.exports = { getDetails, getMedicine, logOut }
