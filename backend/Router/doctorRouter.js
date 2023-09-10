const express = require("express")
const loginDoctor = require("../Controller/DoctorController/docLoginController")
const doctorRouter = express.Router()
const addPrescription = require("../Controller/DoctorController/addPrescriptionController")
const docController = require("../Controller/DoctorController/doctorController")
const viewController = require("../Controller/DoctorController/viewPatientController")
const util = require("../Utils/VerifyToken")

doctorRouter.route("/login").post(loginDoctor)
doctorRouter.route("/add-prescription").post(addPrescription)
doctorRouter.route("/dashboard").get(util.verifyToken, docController.getDetails)
doctorRouter
    .route("/upcoming")
    .get(util.verifyToken, docController.getUpcomingAppointments)
doctorRouter
    .route("/view/patient")
    .get(util.verifyToken, viewController.getDetails)
doctorRouter
    .route("/view/patient/medicine")
    .get(util.verifyToken, viewController.getMedicine)
doctorRouter
    .route("/view/patient/my-doctors")
    .get(util.verifyToken, viewController.getDoctors)
doctorRouter
    .route("/view/patient/appointmentList")
    .get(util.verifyToken, viewController.getAppointmentList)
doctorRouter.route("/logout").post(util.verifyToken, docController.logOut)

module.exports = doctorRouter
