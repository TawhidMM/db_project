const { executeQuery } = require("../../orclConnection");
const hash = require("../../password");

async function saveUpdates(req, res) {
    const patientId = req.access_id;

    const {
        FIRST_NAME,
        LAST_NAME,
        EMAIL,
        STREET_ADDRESS,
        CITY,
        POSTAL_CODE,
        SUB_DISTRICT,
        DISTRICT,
        PASSWORD,
    } = req.body;

    const addressId = `GET_ADD_ID('${STREET_ADDRESS}', '${CITY}', 
                            '${POSTAL_CODE}', '${SUB_DISTRICT}', '${DISTRICT}')`;

    let setPassword = "";

    if (PASSWORD.length !== 0) {
        const passwordHash = await hash(PASSWORD);
        setPassword = `,PASSWORD = '${passwordHash}'`;
    }

    const query = `UPDATE PATIENT
                          SET
                          FIRST_NAME = '${FIRST_NAME}',
                          LAST_NAME = '${LAST_NAME}',
                          EMAIL = '${EMAIL}',
                          ADDRESS_ID = ${addressId},
                          PASSWORD = '${passwordHash}'
                          WHERE PATIENT_ID = '${patientId}' `;

    try {
        const data = await executeQuery(query);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        console.log("error in profile update");
    }
}

module.exports = saveUpdates;
