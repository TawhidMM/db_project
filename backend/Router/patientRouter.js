const express = require('express');

const ptRouter = express.Router();
const ptController = require('../Controller/patientController');

const util= require('../utils');

ptRouter.route('/:id')
.get(ptController.getDetails);

ptRouter.route("/medicine/:id")
.get(util.verifyToken, ptController.getMedicine);

module.exports = ptRouter ;