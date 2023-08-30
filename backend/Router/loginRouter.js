const express = require('express');

const loginRouter = express.Router();
const login = require('../Controller/loginContoller');

loginRouter.route('/')
.post(login.loginUser)

module.exports = loginRouter ;