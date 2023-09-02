const express = require("express")

const ptRouter = express.Router()
const ptController = require("../Controller/PatientControllers/patientController")
const loginController = require("../Controller/PatientControllers/loginContoller")
const signupController = require('../Controller/PatientControllers/PatientSignupController')
const editProfileController = require('../Controller/PatientControllers/ProfileEditController')
const confirmUpdate = require('../Controller/PatientControllers/ConfirmProfileUpadteControoller')
const getMyDoctors = require('../Controller/PatientControllers/FindMyDoctorsController')
const util = require("../Utils/VerifyToken")


ptRouter.route("/login").post(loginController)

ptRouter.route("/s").post(signupController)

ptRouter.route("/dashboard").get(util.verifyToken, ptController.getDetails)

ptRouter.route("/medicine").get(util.verifyToken, ptController.getMedicine)

ptRouter.route("/my-doctors").get(util.verifyToken, getMyDoctors)

ptRouter.route('/edit-profile').get(util.verifyToken, editProfileController)

ptRouter.route('/edit-profile/save-changes').post(util.verifyToken, confirmUpdate)

ptRouter.route("/logout").post(util.verifyToken, ptController.logOut)




module.exports = ptRouter
