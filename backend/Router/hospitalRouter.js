const express = require("express")
const loginHospital = require("../Controller/HospitalController/hospitalLoginController")
const hosController = require("../Controller/HospitalController/hospitalController")
const util = require("../Utils/VerifyToken")
const hospitalRouter = express.Router()

hospitalRouter.route("/login").post(loginHospital)
hospitalRouter
    .route("/dashboard")
    .get(util.verifyToken, hosController.getDetails)
hospitalRouter.route("/logout").post(util.verifyToken, hosController.logOut)

module.exports = hospitalRouter
