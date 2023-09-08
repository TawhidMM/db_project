const express = require("express")
const util = require("../Utils/VerifyToken");

const ptRouter = express.Router();
const ptController = require("../Controller/PatientControllers/patientController");
const loginController = require("../Controller/PatientControllers/loginContoller");
const signupController = require("../Controller/PatientControllers/PatientSignupController");
const editProfileController = require("../Controller/PatientControllers/ProfileEditController");
const confirmUpdate = require("../Controller/PatientControllers/ConfirmProfileUpadteControoller");
const getMyDoctors = require("../Controller/PatientControllers/FindMyDoctorsController");
const testResult = require('../Controller/PatientControllers/TestResultController')




ptRouter.route("/login").post(loginController);

ptRouter.route("/s").post(signupController);

ptRouter.route("/dashboard").get(util.verifyToken, ptController.getDetails);

ptRouter.route("/medicine").get(util.verifyToken, ptController.getMedicine);

ptRouter.route("/my-doctors").get(util.verifyToken, getMyDoctors);

ptRouter.route("/edit-profile").get(util.verifyToken, editProfileController);

ptRouter
    .route("/edit-profile/save-changes")
    .post(util.verifyToken, confirmUpdate);

ptRouter.route("/logout").post(util.verifyToken, ptController.logOut);

ptRouter.route("/medicine").get(util.verifyToken, ptController.getMedicine);

ptRouter
    .route("/history/appointmentList")
    .get(util.verifyToken, ptController.getAppointmentList);

ptRouter
    .route("/history/appointment")
    .get(util.verifyToken, ptController.getAppointmentPrecription);

ptRouter.route('/history/test-result').get(util.verifyToken, testResult)

ptRouter.route("/logout").post(util.verifyToken, ptController.logOut)




module.exports = ptRouter;
