const express = require("express");
const loginDoctor = require("../Controller/DoctorController/docLoginController");
const doctorRouter = express.Router()
const addPrescription = require('../Controller/DoctorController/addPrescriptionController')
const docController = require("../Controller/DoctorController/doctorController")
const util = require("../Utils/VerifyToken")


doctorRouter.route("/login").post(loginDoctor)
doctorRouter.route('/add-prescription').post(util.verifyToken, addPrescription)
doctorRouter.route("/dashboard").get(util.verifyToken, docController.getDetails)
doctorRouter
    .route("/upcoming")
    .get(util.verifyToken, docController.getUpcomingAppointments)
doctorRouter.route("/logout").post(util.verifyToken, docController.logOut)

module.exports = doctorRouter;
