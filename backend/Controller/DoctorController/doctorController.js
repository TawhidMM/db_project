const db = require("../../orclConnection")
require("jsonwebtoken")

async function getDetails(req, res) {
    console.log(req.access_id + " get details of USER")

    const doctorId = req.access_id

    const query = `SELECT FIRST_NAME ||' '||LAST_NAME NAME, EMAIL, GENDER,IMAGE_URL PHOTO_URL,
                    SPECIALIZATION, EXPERIENCE
                    FROM DOCTOR
                    WHERE DOCTOR_ID = '${doctorId}'`

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
