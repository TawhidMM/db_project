const {executeQuery} = require('../../orclConnection')
const hashPassword = require('../../password')
const errorMsg = require('../../Utils/OrclErrorMap')

async function signupPatient(req, res) {
    console.log('got here')
    //console.log(req.body)

    const {
        nid, firstName, lastName, email, bloodGroup, gender,
        dob, imageUrl, street, city, postalCode, subDistrict,
        district, password} = req.body

    const hashedPass = await hashPassword(password)

    const addressId = `GET_ADD_ID('${street}', '${city}' ,'${postalCode}', '${subDistrict}', '${district}')`
    const dateOfBirth = `TO_DATE('${dob}', 'YYYY-MM-DD')`

    const query = `INSERT INTO PATIENT
                          (PATIENT_ID, EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, 
                          GENDER, DOB, BLOOD_GROUP, ADDRESS_ID, PHOTO_URL)
                          VALUES 
                          ('P${nid}', '${email}', '${hashedPass}', '${firstName}', '${lastName}',
                          '${gender}', ${dateOfBirth}, '${bloodGroup}', ${addressId}, '${imageUrl}' )`

    try {
        const result = await executeQuery(query)

        res.status(200).json({ success: true, message: "signed up" })

    } catch (error) {

        const msg = errorMsg(error.message)
        console.log(msg)
        res.status(436).json({ success: false, message: msg })
    }
}


module.exports = signupPatient
