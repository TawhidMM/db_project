const express = require("express");
const infoRouter = express.Router();
const getInfo = require('../Controller/InfoController/getInfoController')



infoRouter.route('/all-medicines').get(getInfo.allMedicines)
infoRouter.route('/all-diseases').get(getInfo.allDiseases)
infoRouter.route('/all-tests').get(getInfo.allTests)

module.exports = infoRouter
