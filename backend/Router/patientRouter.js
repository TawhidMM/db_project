const express = require('express');

const ptRouter = express.Router();
const ptController = require('../Controller/patientController');

ptRouter.route('/:id')
.get(ptController.getDetails);

module.exports = ptRouter ;