const express = require("express");

const ptRouter = express.Router();
const ptController = require("../Controller/patientController")
const signupController = require('../Controller/PatientSignupController')
const util = require("../utils")




ptRouter.route("/s").post(signupController)

ptRouter.route("/dashboard").get(util.verifyToken, ptController.getDetails)

ptRouter.route("/medicine").get(util.verifyToken, ptController.getMedicine)

ptRouter.route("/logout").post(util.verifyToken, ptController.logOut)

module.exports = ptRouter
