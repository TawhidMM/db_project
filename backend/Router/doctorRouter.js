const express = require("express");
const loginDoctor = require("../Controller/DoctorController/docLoginController");
const doctorRouter = express.Router()
const addPrescription = require('../Controller/DoctorController/addPrescriptionController')

doctorRouter.route("/login").post(loginDoctor)
doctorRouter.route('/add-prescription').post(addPrescription)

module.exports = doctorRouter;
