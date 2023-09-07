const db = require("../../orclConnection")
require("jsonwebtoken")

// async function getDoctors(req, res) {
//     const patientId = req.access_id

//     const query = `SELECT (D.FIRST_NAME || ' ' || D.LAST_NAME) NAME,
//                     M.CENTER_NAME MED_CENTER,
//                     (A.STREET_ADDRESS || ', ' || A.CITY || ', ' || A.SUB_DISTRICT || ', ' ||A.DISTRICT || '-' || A.POSTAL_CODE) ADDRESS
//                     FROM DOCTOR D JOIN DOCTOR_AVAILABILITY DA
//                     ON D.DOCTOR_ID = DA.DOCTOR_ID JOIN
//                     MEDICAL_CENTER M ON DA.CENTER_ID =M.MED_CENTER_ID
//                     JOIN ADDRESS A ON A.ADDRESS_ID = M.ADDRESS_ID
//                     WHERE LOWER( D.SPECIALIZATION )= LOWER('${specialist}')
//                     AND LOWER( A.SUB_DISTRICT) = LOWER('${location}')`

//     try {
//         const data = await db.executeQuery(query)

//         return res.status(200).send(data)
//     } catch (error) {
//         console.log("error in get my doctors")

//         console.log(error)
//     }
// }

// server.get("/find-doctor", async (req, res) => {
//     const allSpeciality = await connection.executeQuery(
//         "SELECT DISTINCT SPECIALIZATION SPECIALIST FROM DOCTOR"
//     )

//     const allSubDistrict = await connection.executeQuery(
//         "SELECT DISTINCT SUB_DISTRICT FROM ADDRESS"
//     )

//     res.render("find_doc.ejs", {
//         allSpeciality: allSpeciality,
//         allSubDistrict: allSubDistrict,
//     })
// })

// server.get("/find-doctor/:specialist&:location", async (req, res) => {
//     const { specialist, location } = req.params

//     const query = `SELECT (D.FIRST_NAME || ' ' || D.LAST_NAME) NAME,
//                                   M.CENTER_NAME MED_CENTER,
//                                   (A.STREET_ADDRESS || ', ' || A.CITY || ', ' || A.SUB_DISTRICT || ', ' ||
//                                         A.DISTRICT || '-' || A.POSTAL_CODE) ADDRESS
//                         FROM DOCTOR D JOIN DOCTOR_AVAILABILITY DA
//                         ON D.DOCTOR_ID = DA.DOCTOR_ID JOIN
//                         MEDICAL_CENTER M ON DA.CENTER_ID =M.MED_CENTER_ID
//                         JOIN ADDRESS A ON A.ADDRESS_ID = M.ADDRESS_ID
//                         WHERE LOWER( D.SPECIALIZATION )= LOWER('${specialist}')
//                         AND LOWER( A.SUB_DISTRICT) = LOWER('${location}')`

//     try {
//         const data = await connection.executeQuery(query)

//         console.log(specialist + " " + location)

//         res.send(data)
//     } catch (error) {
//         console.log("error in /find-doctor/:specialist&:location")
//         console.log(error)
//     }
// })

module.exports = {}
