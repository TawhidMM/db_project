const express = require("express");

const ptRouter = express.Router();
const ptController = require("../Controller/patientController");

const util = require("../utils");

ptRouter.route("/dashboard").get(util.verifyToken, ptController.getDetails);

ptRouter.route("/medicine").get(util.verifyToken, ptController.getMedicine);
ptRouter
    .route("/history/appointmentList")
    .get(util.verifyToken, ptController.getAppointmentList);
ptRouter
    .route("/history/appointment")
    .get(util.verifyToken, ptController.getAppointmentPrecription);
ptRouter.route("/logout").post(util.verifyToken, ptController.logOut);

module.exports = ptRouter;
