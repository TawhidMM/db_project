import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ImageNameCard from "../components/ImageNameCard"
import DoctorHeader from "../components/DoctorHeader"
import DetailsCard from "../components/DetailsCard"

import removeKey from "../util/RemoveKey"

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null)
    const navigate = useNavigate()

    // keys will be removed for Details Card
    const toBeRemovedKey = ["PHOTO_URL"]

    useEffect(() => {
        const getPatient = async () => {
            try {
                const response = await axios.get("/patient/dashboard") // Replace with patient API endpoint
                setPatient(response.data[0])
            } catch (error) {
                console.error("Error fetching patient information:", error)
            }
        }

        ;(async () => {
            await getPatient()
        })()
    }, [])

    return (
        <>
            <div>
                <PatientHeader />
                <center>
                    <h1>Patient Dashboard</h1>
                    {patient ? (
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-4">
                                    <ImageNameCard person={patient} />
                                </div>
                                <div className="col-lg-8">
                                    <DetailsCard
                                        person={
                                            removeKey(
                                                [patient],
                                                toBeRemovedKey
                                            )[0]
                                        }
                                    />
                                </div>
                            </div>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={(event) =>
                                    navigate("../patient/edit-profile")
                                }
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <p>No data</p>
                    )}
                </center>
            </div>
        </>
    )
}

export default PatientDashboard