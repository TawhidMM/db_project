const db = require("../../orclConnection");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
    res.cookie("login", false, { httpOnly: true });
    console.log("in login");

    try {
        const { nid, password } = req.body;

        const query = `SELECT PATIENT_ID, FIRST_NAME, LAST_NAME, PASSWORD
                              FROM PATIENT
                              WHERE PATIENT_ID = 'P${nid}'`;

        const data = await db.executeQuery(query);
        // data = array of object containing selected
        // attributes
        if (data.length === 0) {
            console.log("wrong nid");
            return res
                .status(400)
                .json({ success: false, message: "wrong nid" });
        }
        const {
            PATIENT_ID: id,
            FIRST_NAME: firstName,
            LAST_NAME: lastName,
            PASSWORD: hashPass,
        } = data[0];

        const fullName = firstName + " " + lastName;

        let checkPassword = await bcrypt.compare(password, hashPass);

        if (!checkPassword) {
            console.log("wrong password");
            return res
                .status(400)
                .json({ success: false, message: "wrong credentials" });
        }

        const token = jwt.sign({ id: id }, "" + process.env.secretKey, {
            expiresIn: "1d",
        });

        res.cookie("login", token, { httpOnly: true });

        return res.status(200).json({
            success: true,
            message: "accepted",
            userToken: token,
            id,
            fullName,
        });
    } catch (error) {
        console.log("error in api /login");
        console.log(error);
    }
}

module.exports = loginUser;
