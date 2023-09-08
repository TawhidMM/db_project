import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import DoctorHeader from "../components/DoctorHeader"
import TableHeaders from "../components/TableHeaders"

import removeKey from "../util/RemoveKey"

const UpcomingAppointment = () => {
    const [appointments, setAppointments] = useState(null)
    const [patientLinks, setPatientLinks] = useState([])
    const navigate = useNavigate()

    // // keys will be removed for Details Card
    // const toBeRemovedKey = ["PHOTO_URL"]

    useEffect(() => {
        const getUpcomingAppointments = async () => {
            try {
                const response = await axios.get("/doctor/upcoming")
                setAppointments(response.data)

                setPatientLinks(
                    response.data.map(
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
        }

        ;(async () => {
            await getUpcomingAppointments()
        })()
    }, [])

    return (
        <>
            <div>
                <DoctorHeader />

                <center>
                    {appointments ? (
                        <div>
                            <h2>Upcoming Appointments</h2>
                            <br />
                            <TableHeaders
                                info={appointments}
                                highlightedInfo={[]}
                                links={patientLinks}
                            />
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
