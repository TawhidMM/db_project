const db = require("../../orclConnection")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

async function loginHospital(req, res) {
    res.cookie("login", false, { httpOnly: true })

    try {
        const { nid, password } = req.body

        const query = `SELECT *
                        FROM MEDICAL_CENTER
                        WHERE MED_CENTER_ID = 'M${nid}'`

        const data = await db.executeQuery(query)

        if (data.length === 0) {
            console.log("wrong nid")
            return res.status(400).json({ success: false, message: "wrong id" })
        }

        const {
            MED_CENTER_ID: id,
            PASSWORD: hashPass,
            CENTER_NAME: Name,
        } = data[0]

        // const fullName = firstName + " " + lastName;

        let checkPassword = await bcrypt.compare(password, hashPass)

        if (!checkPassword) {
            console.log("wrong pass")

            return res
                .status(401)
                .json({ success: false, message: "wrong credentials" })
        }

        const token = jwt.sign({ id: id }, "" + process.env.secretKey, {
            expiresIn: "1d",
        })

        res.cookie("login", token, { httpOnly: true })

        return res.status(200).json({
            success: true,
            message: "accepted",
            userToken: token,
            id,
            Name,
        })
    } catch (error) {
        console.log("error in api /login")
        console.log(error)
    }
}

module.exports = loginHospital
