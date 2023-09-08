const {executeQuery} = require("../../orclConnection");


async function addPrescription(req, res) {

    const appointmentInfo = req.body.condition
    const medicines = req.body.medicines
    const diseases =  req.body.diseases
    const tests = req.body.tests

    //const doctorId = req.access_id
    const doctorId = 'D0041'

    let getAppointmentId

    try {
        let query = `SELECT (MAX(APPOINTMENT_ID) + 1) ID
                                FROM PAST_APPOINTMENT`

        getAppointmentId = await executeQuery(query)
        const {ID: appointmentId} = getAppointmentId[0]


        await addAppointment(appointmentId, appointmentInfo, doctorId)
        await addMedicines(appointmentId, medicines)
        await addDiseases(appointmentId, diseases)
        await addTests(appointmentId, tests)

    } catch(error) {
        console.log(error)
    }

}

async function addAppointment(appointmentId, appointmentInfo, doctorId){

    try{
        const query = `BEGIN
                                ADD_PRESCRIPTION('${appointmentId}', '${appointmentInfo.date}', 
                                    '${appointmentInfo.dateFormat}','${appointmentInfo.symptoms}', 
                                    '${appointmentInfo.weight}', '${appointmentInfo.bloodPressure}',
                                    '${appointmentInfo.height}', '${appointmentInfo.heartRate}', 
                                    '${appointmentInfo.patientId}','${doctorId}', '${appointmentInfo.medicalCenter}');
                              END;`

        await executeQuery(query)


    } catch (error) {
            console.log("error in api /doctor/add-prescription adding appointment info")
            throw error
    }
}

async function addMedicines(appointmentId, medicines){
    try{
        medicines.map(async med => {

            const query = `BEGIN
                                    ADD_MEDICINE(${appointmentId}, '${med.name}', '${med.dose}',
                                        '${med.frequency}','${med.duration}',
                                         '${med.timing}');
                                  END;`

            await executeQuery(query)
        })

    } catch (error) {
        console.log("error in api /doctor/add-prescription  adding medicines")
        throw error
    }
}

async function addDiseases(appointmentId, diagnosedDiseases){
    try{
        diagnosedDiseases.map(async disease => {
            const query = `BEGIN
                                      ADD_DISEASES(${appointmentId}, '${disease}');
                                  END;`

            await executeQuery(query)
        })

    } catch (error) {
        console.log("error in api /doctor/add-prescription  adding diseases")
        throw error
    }
}

async function addTests(appointmentId, givenTests){
    try{
        givenTests.map(async test => {
            const query = `BEGIN
                                     ADD_TESTS(${appointmentId}, '${test}');
                                  END;`

            await executeQuery(query)
        })

    } catch (error) {
        console.log("error in api /doctor/add-prescription  adding tests")
        throw error
    }
}



module.exports = addPrescription
