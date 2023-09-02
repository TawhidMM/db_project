const db = require("../../orclConnection");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

async function loginDoctor(req, res) {
    res.cookie("login", false, { httpOnly: true })

    try {
        const { nid, password } = req.body

        const query = `SELECT *
                              FROM DOCTOR
                              WHERE DOCTOR_ID = 'D${nid}'`

        const data = await db.executeQuery(query)

        if (data.length === 0) {
            console.log("wrong nid");
            return res
                .status(400)
                .json({ success: false, message: "wrong id" })
        }
        const {
            DOCTOR_ID: id,
            PASSWORD: hashPass,
        } = data[0]

        let checkPassword = await bcrypt.compare(password, hashPass)

        if (!checkPassword)
            return res
                .status(400)
                .json({ success: false, message: "wrong credentials" })

        const token = jwt.sign({ id: id }, "" + process.env.secretKey, {
            expiresIn: "1d",
        });

        res.cookie("login", token, { httpOnly: true })

        return res.status(200).json({
            success: true,
            message: "accepted",
            userToken: token,
        })

    } catch (error) {
        console.log("error in api /login");
        console.log(error);
    }
}

module.exports = loginDoctor
