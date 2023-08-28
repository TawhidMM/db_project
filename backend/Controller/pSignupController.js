const db =
    require('../orclConnection')

const bcrypt= require('bcrypt')

async function signupPatient(req, res) {
    console.log('got here')
    console.log(req.body)

    const {
        nid, firstName, lastName, email, bloodGroup, gender,
        dob, imageUrl, street, city, postalCode, subDistrict,
        district, password} = req.body

    const hashedPass = ''
    const addressId = ''

    const query = `INSERT INTO PATIENT
                          (PATIENT_ID, EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, 
                          GENDER, DOB, BLOOD_GROUP, ADDRESS_ID, PHOTO_URL)
                          VALUES 
                          ('P${nid}', ${email}, ${hashedPass}, ${firstName}, ${lastName},
                            ${gender}, ${dob}, ${bloodGroup}, ${addressId}, ${imageUrl})`


    res.send('got')

}

module.exports = signupPatient