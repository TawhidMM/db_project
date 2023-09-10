const express = require("express")
const loginHospital = require("../Controller/HospitalController/hospitalLoginController")
const hosController = require("../Controller/HospitalController/hospitalController")
const {getTests, getTestParams, submitTestResult} = require('../Controller/HospitalController/testUploadController')
const util = require("../Utils/VerifyToken")
const hospitalRouter = express.Router()


hospitalRouter.route("/login").post(loginHospital)

hospitalRouter
    .route("/dashboard")
    .get(util.verifyToken, hosController.getDetails)

hospitalRouter.route("/logout").post(util.verifyToken, hosController.logOut)

hospitalRouter.route('/upload-result').post(util.verifyToken, getTestParams)

hospitalRouter.route('/upload-result/test-names').get(util.verifyToken, getTests)

hospitalRouter.route('/upload-result/submit').post(util.verifyToken, submitTestResult)




module.exports = hospitalRouter
