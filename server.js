const express = require('express')
const connection = require('./orclConnection')

const server = express()

connection.createPool()

server.set('view engine', 'ejs')

server.listen(5005)

server.get('/find-doctor', async (req,
                            res) =>{

    const allSpeciality =
        await connection.executeQuery("SELECT DISTINCT SPECIALIZATION SPECIALIST FROM DOCTOR")

    const allSubDistrict = await
        connection.executeQuery("SELECT DISTINCT SUB_DISTRICT FROM ADDRESS")

    res.render("find_doc.ejs", {
        allSpeciality : allSpeciality,
        allSubDistrict : allSubDistrict
    })
})

server.get('/find-doctor/:speciality&:location', async (req,
                                     res) =>{
    const specialist = req.params.speciality
    const location = req.params.location

    const query = `SELECT (D.FIRST_NAME || ' ' || D.LAST_NAME) NAME,
                                  M.CENTER_NAME MED_CENTER,
                                  (A.STREET_ADDRESS || ', ' || A.CITY || ', ' || A.SUB_DISTRICT || ', ' ||
                                        A.DISTRICT || '-' || A.POSTAL_CODE) ADDRESS
                        FROM DOCTOR D JOIN DOCTOR_AVAILABILITY DA
                        ON D.DOCTOR_ID = DA.DOCTOR_ID JOIN
                        MEDICAL_CENTER M ON DA.CENTER_ID =M.MED_CENTER_ID
                        JOIN ADDRESS A ON A.ADDRESS_ID = M.ADDRESS_ID
                        WHERE LOWER( D.SPECIALIZATION )= LOWER('${specialist}')
                        AND LOWER( A.SUB_DISTRICT) = LOWER('${location}')`

    const data = await connection.executeQuery(query)

    console.log(specialist + " " + location)

    res.send(data)
})





