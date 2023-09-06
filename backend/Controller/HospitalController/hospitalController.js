const db = require("../../orclConnection")
require("jsonwebtoken")

async function getDetails(req, res) {
    console.log(req.access_id + " get details of Hospital")

    const hospitalId = req.access_id

    const query = `SELECT CENTER_NAME NAME, EMAIL,PHOTO_URL,
                    (SELECT STREET_ADDRESS||' '||CITY||', '||SUB_DISTRICT||', '||DISTRICT||', '||POSTAL_CODE 
                    FROM MEDICAL_CENTER pt LEFT JOIN ADDRESS ad ON (pt.ADDRESS_ID=ad.ADDRESS_ID)
                    WHERE pt.MED_CENTER_ID='${hospitalId}') ADDRESS
                    FROM MEDICAL_CENTER
                    WHERE MED_CENTER_ID = '${hospitalId}'`

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

async function logOut(req, res) {
    res.cookie("login", "", { httpOnly: true })

    res.json({ success: true })
}

module.exports = {
    getDetails,
    logOut,
}
