import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import ImageNameCard from "../components/ImageNameCard"
import DoctorHeader from "../components/DoctorHeader"
import DetailsCard from "../components/DetailsCard"
import TableHeaders from "../components/TableHeaders"

import removeKey from "../util/RemoveKey"

const DoctorDashboard = () => {
    const [doctor, setDoctor] = useState(null)
    const navigate = useNavigate()

    // keys will be removed for Details Card
    const toBeRemovedKey = ["PHOTO_URL"]

    useEffect(() => {
        const getDoctor = async () => {
            try {
                const response = await axios.get("/Doctor/dashboard") // Replace with Doctor API endpoint
                setDoctor(response.data[0])
            } catch (error) {
                console.error("Error fetching Doctor information:", error)
            }
        }

        ;(async () => {
            await getDoctor()
        })()
    }, [])

    return (
        <>
            <div>
                <DoctorHeader />
                <center>
                    <h1>Doctor Dashboard</h1>
                    {doctor ? (
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-4">
                                    <ImageNameCard person={doctor} />
                                </div>
                                <div className="col-lg-8">
                                    <DetailsCard
                                        person={
                                            removeKey(
                                                [doctor],
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
                                    navigate("../doctor/edit-profile")
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

export default DoctorDashboard
