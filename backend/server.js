const express = require('express')
const connection = require('./orclConnection')

const cookie_parser = require('cookie-parser');
const server = express()


server.use(express.json());
server.set('view engine', 'ejs')
server.use(cookie_parser());

const loginRouter = require('./Router/loginRouter')
const patientRouter = require('./Router/patientRouter');

/*// create database connection pool
(async ()=>{
    await connection.createPool()
})()*/

connection.createPool().then(r => {})


server.listen(5005, ()=>{
    console.log('server listening at 5005')
})


server.use("/login",loginRouter);

server.use("/patient",patientRouter);


server.get('/', (req,
                 res)=>{
    res.send("hii there")
})

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


server.get('/find-doctor/:specialist&:location', async (req,
                                     res) =>{
    const{specialist, location} = req.params

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

    try{
        const data = await connection.executeQuery(query)

        console.log(specialist + " " + location)

        res.send(data)
    } catch(error) {
        console.log('error in /find-doctor/:specialist&:location')
        console.log(error)
    }
});





