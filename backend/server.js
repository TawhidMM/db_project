const express = require("express")
const connection = require("./orclConnection")

const cookie_parser = require("cookie-parser")
const server = express()

server.use(express.json())
server.set("view engine", "ejs")
server.use(cookie_parser())

const doctorRouter = require("./Router/doctorRouter")
const patientRouter = require("./Router/patientRouter")
const infoRouter = require("./Router/infoRouter")
const hospitalRouter = require("./Router/hospitalRouter")

/*// create database connection pool
(async ()=>{
    await connection.createPool()
})()*/

connection.createPool().then((r) => {})

server.listen(5005, () => {
    console.log("server listening at 5005")
})

server.use("/patient", patientRouter)
server.use("/doctor", doctorRouter)
server.use("/hospital", hospitalRouter)
server.use("/info", infoRouter)

server.get("/", (req, res) => {
    res.send("hii there")
})
