const db = require("../../orclConnection")
require("jsonwebtoken")

async function getDetails(req, res) {
    console.log(req.query.patient_id + " get details of patient for doctor")

    const patientId = req.query.patient_id

    const query = `SELECT FIRST_NAME ||' '||LAST_NAME NAME, EMAIL, GENDER, TO_CHAR(DOB, 'DD MONTH YYYY') DOB, BLOOD_GROUP, PHOTO_URL ,
                    STREET_ADDRESS||' '||CITY||', '||SUB_DISTRICT||', '||DISTRICT||', '||POSTAL_CODE ADDRESS

                    FROM PATIENT pt LEFT JOIN ADDRESS ad ON (pt.ADDRESS_ID=ad.ADDRESS_ID)
                    WHERE PATIENT_ID = '${patientId}'`

    const query2 = `SELECT HEIGHT, TO_CHAR(APPOINTMENT_DATE ,'DD-Mon-YYYY') dateon
                    FROM PAST_APPOINTMENT 
                    WHERE PATIENT_ID= '${patientId}'
                    ORDER BY APPOINTMENT_DATE ASC`

    try {
        const data = await db.executeQuery(query)
        const data2 = await db.executeQuery(query2)

        if (data.length === 0)
            return res
                .status(400)
                .json({ success: false, message: "not found" })

        return res.status(200).send({ data, data2 })
    } catch (error) {
        console.log("error in get details")

        console.log(error)
    }
}

async function getMedicine(req, res) {
    console.log(req.query.patient_id + " get medicine of USER")

    const patientId = req.query.patient_id

    const sinceMonth = req.query.month
    const doctor = req.query.doctor

    console.log(sinceMonth)

    function getQuery(runningMedCondition) {
        return `SELECT  MEDICINE_NAME NAME, DOSAGE_AMOUNT DOSAGE, DOSAGE_FREQUENCY FREQUENCY, DURATION, TIMING ,
                                                (SELECT FIRST_NAME||' '||LAST_NAME
                                                FROM PAST_APPOINTMENT pa LEFT JOIN DOCTOR d ON (pa.DOCTOR_ID=d.DOCTOR_ID)
                                                WHERE pa.APPOINTMENT_ID= p.APPOINTMENT_ID) Prescribed_by,

                                                TO_CHAR( (SELECT APPOINTMENT_DATE
                                                FROM PAST_APPOINTMENT pa LEFT JOIN DOCTOR d ON (pa.DOCTOR_ID=d.DOCTOR_ID)
                                                WHERE pa.APPOINTMENT_ID= p.APPOINTMENT_ID), 'DD MON YYYY') Prescribed_on,
                                                TILLDATE(APPOINTMENT_ID,m.MEDICINE_ID) TILL, m.DESCRIPTION MED_URL

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

        return res.status(200).json({ running: runningMeds, past: pastMeds })
    } catch (error) {
        console.log(error)
        console.log("error in getMedicine")
    }
}

async function getAppointmentList(req, res) {
    console.log(req.query.patient_id + " get AppointmentList of USER")

    const patientId = req.query.patient_id

    const query = `SELECT pa.APPOINTMENT_ID, TO_CHAR(pa.APPOINTMENT_DATE, 'DD-MON-YYYY') APPOINTMENT_DATE, 'Dr. '||d.FIRST_NAME||' '||d.LAST_NAME DRNAME, m.CENTER_NAME, SYMPTOMS
                    FROM PAST_APPOINTMENT pa JOIN DOCTOR d ON (pa.DOCTOR_ID=d.DOCTOR_ID)
                        JOIN MEDICAL_CENTER m ON (pa.MED_CENTER_ID= m.MED_CENTER_ID)
                    WHERE pa.PATIENT_ID='${patientId}'
                    ORDER BY pa.APPOINTMENT_DATE DESC`

    try {
        const data = await db.executeQuery(query)

        return res.status(200).send(data)
    } catch (error) {
        console.log(error)
        console.log("error in getAppointmentList")
    }
    //return res.json({success: true});
}

async function getAppointmentPrecription(req, res) {
    console.log("in")
    console.log(req.access_id + " get appointment of USER")
    const appointment_id = req.query.appointment_id
    console.log(appointment_id)

    const query1 = `SELECT 'Dr. '||d.FIRST_NAME||' '||d.LAST_NAME DRNAME ,
                            d.SPECIALIZATION,
                            d.DOCTOR_ID,
                            pa.APPOINTMENT_ID,
                            TO_CHAR( pa.APPOINTMENT_DATE , 'DD/MM/YYYY') APPOINTMENT_DATE,
                            d.EMAIL,
                            m.CENTER_NAME,
                            m.MED_CENTER_ID,
                            m.EMAIL,
                            a.STREET_ADDRESS||' '||a.CITY||', '||a.SUB_DISTRICT||', '||a.DISTRICT||', '||a.POSTAL_CODE MEDADDRESS,
                            p.PATIENT_ID,
                            p.FIRST_NAME||' '||p.LAST_NAME PATIENTNAME,
                            p.GENDER,
                            trunc(MONTHS_BETWEEN(pa.APPOINTMENT_DATE,p.DOB)/12) AGE ,
                            pa.SYMPTOMS,
                            pa.WEIGHT,
                            pa.BLOOD_PRESSURE,
                            pa.HEART_RATE,
                            pa.HEIGHT
                    FROM PAST_APPOINTMENT pa
                    JOIN PATIENT p ON (pa.PATIENT_ID=p.PATIENT_ID)
                    JOIN DOCTOR d ON (pa.DOCTOR_ID = d.DOCTOR_ID)
                    JOIN MEDICAL_CENTER m ON (m.MED_CENTER_ID= pa.MED_CENTER_ID)
                    JOIN ADDRESS a ON (m.ADDRESS_ID=a.ADDRESS_ID)
                    WHERE pa.APPOINTMENT_ID=${appointment_id}`

    const query2 = `SELECT MEDICINE_NAME, DOSAGE_AMOUNT, DOSAGE_FREQUENCY, DURATION, TIMING, 
                    TILLDATE(APPOINTMENT_ID,m.MEDICINE_ID) TILL
                    FROM PRESCRIBED_MEDICINES pm JOIN MEDICINE m ON (pm.MEDICINE_ID=m.MEDICINE_ID)
                    WHERE APPOINTMENT_ID= ${appointment_id}`

    const query3 = `SELECT DISEASE_NAME, DESCRIPTION
                    FROM DIAGNOSED_DISEASES dd JOIN DISEASE d ON (d.DISEASE_ID=dd.DISEASE_ID)
                    WHERE APPOINTMENT_ID=${appointment_id}`

    const query4 = `SELECT mt.TEST_NAME
                    FROM SUGGESTED_TESTS st JOIN MEDICAL_TEST mt ON (st.TEST_ID=mt.TEST_ID)
                    WHERE st.APPOINTMENT_ID=${appointment_id}`

    try {
        const query = `SELECT PATIENT_ID
                    FROM PAST_APPOINTMENT
                    WHERE APPOINTMENT_ID=${appointment_id}`

        const id_data = await db.executeQuery(query)
        console.log(appointment_id, id_data[0].PATIENT_ID)

        if (id_data[0].PATIENT_ID !== req.access_id)
            return res
                .status(404)
                .json({ success: false, message: "not found" })

        const details = await db.executeQuery(query1)
        const medicines = await db.executeQuery(query2)
        const diagnosed = await db.executeQuery(query3)
        const test = await db.executeQuery(query4)
        return res.status(200).send({ details, medicines, diagnosed, test })

        // return res.status(200).send(data);
    } catch (error) {
        console.log(error)
        console.log("error in getAppointmentHistory")
    }
}

async function getDoctors(req, res) {
    const patientId = req.query.patient_id

    const query = `SELECT DISTINCT (D.FIRST_NAME || ' ' || D.LAST_NAME) DOCTOR_NAME
                            FROM PAST_APPOINTMENT PA JOIN PRESCRIBED_MEDICINES PM
                            ON PA.APPOINTMENT_ID = PM.APPOINTMENT_ID JOIN DOCTOR D
                            ON PA.DOCTOR_ID = D.DOCTOR_ID
                            WHERE PATIENT_ID = '${patientId}'`

    try {
        const data = await db.executeQuery(query)

        return res.status(200).send(data)
    } catch (error) {
        console.log("error in get my doctors")

        console.log(error)
    }
}

module.exports = {
    getDetails,
    getMedicine,
    getDoctors,
    getAppointmentPrecription,
    getAppointmentList,
}
