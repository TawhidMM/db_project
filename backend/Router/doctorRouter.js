const express = require("express")
const loginDoctor = require("../Controller/DoctorController/docLoginController")
const docController = require("../Controller/DoctorController/doctorController")
const util = require("../Utils/VerifyToken")
const doctorRouter = express.Router()

doctorRouter.route("/login").post(loginDoctor)
doctorRouter.route("/dashboard").get(util.verifyToken, docController.getDetails)
doctorRouter
    .route("/upcoming")
    .get(util.verifyToken, docController.getUpcomingAppointments)
doctorRouter.route("/logout").post(util.verifyToken, docController.logOut)

module.exports = doctorRouter
