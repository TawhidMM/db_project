const express = require("express")
const loginDoctor = require("../Controller/DoctorController/docLoginController");
const doctorRouter = express.Router()


doctorRouter.route('/login').post(loginDoctor)
