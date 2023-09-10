import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import DoctorHeader from "../components/DoctorHeader"
import TableHeaders from "../components/TableHeaders"

import removeKey from "../util/RemoveKey"
import formatString from "../util/StringFormat";

const UpcomingAppointment = () => {
    const [appointments, setAppointments] = useState(null)
    const [todayAppNum, setTodayAppNum] = useState(null)
    const [patientLinks, setPatientLinks] = useState([])
    const navigate = useNavigate()



    useEffect(() => {

        (async () => {
            try {
                const response = await axios.get("/doctor/upcoming")
                setAppointments(response.data.upcoming)

                const {TODAY_APPOINTMENT} = response.data.todayNum[0]
                setTodayAppNum(TODAY_APPOINTMENT)

                setPatientLinks(
                    response.data.upcoming.map(
                        (a) =>
                            `http://localhost:3000/doctor/view/patient/?patient_id=${a.PATIENT_NID}`
                    )
                )
            } catch (error) {
                console.error(
                    "Error fetching Doctor upcoming Appointments:",
                    error
                )
            }
        })()

    }, [])

    function handleAddClick(patient) {
        navigate(`../add-med/?patient_id=${patient.PATIENT_NID}&patient_name=${patient.PATIENT_NAME}`)
    }

    return (
        <>
            <div>
                <DoctorHeader />

                <center>
                    {appointments ? (
                        <div>
                            <h2>Upcoming Appointments</h2>
                            <br />
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    {
                                        Object.keys(appointments[0]).map((key) => (
                                            <th scope="col" key={key}> {formatString(key)} </th>
                                        ))}
                                </tr>
                                </thead>
                                <tbody>
                                {appointments.map((rows,rowIndex) =>
                                    <tr className="table-light" key={rowIndex}>
                                        {Object.keys(rows).map((key,colIndex) =>
                                            <td key={key}>
                                                {colIndex === 0 ? (
                                                    <a href={patientLinks[rowIndex]}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                    >
                                                        {rows[key]}
                                                    </a>
                                                ) : rows[key] }
                                            </td>
                                        )}
                                        <td>
                                            {rowIndex < todayAppNum &&
                                                <button type="button"
                                                        className="btn btn-outline-dark"
                                                        onClick={e=>
                                                            handleAddClick(rows)}
                                                >
                                                    Add prescription
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No data</p>
                    )}
                </center>
            </div>
        </>
    )
}

export default UpcomingAppointment
