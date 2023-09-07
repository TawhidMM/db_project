import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import ImageNameCard from "../components/ImageNameCard"
import HospitalHeader from "../components/HospitalHeader"
import DetailsCard from "../components/DetailsCard"
import TableHeaders from "../components/TableHeaders"

import removeKey from "../util/RemoveKey"

const HospitalDashboard = () => {
    const [hospital, setHospital] = useState(null)
    const navigate = useNavigate()

    // keys will be removed for Details Card
    const toBeRemovedKey = ["PHOTO_URL"]

    useEffect(() => {
        const getHospital = async () => {
            try {
                const response = await axios.get("/hospital/dashboard") // Replace with Hospital API endpoint
                setHospital(response.data[0])
            } catch (error) {
                console.error("Error fetching Hospital information:", error)
            }
        }

        ;(async () => {
            await getHospital()
        })()
    }, [])

    return (
        <>
            <div>
                <HospitalHeader />
                <center>
                    <h1>Hospital Dashboard</h1>
                    {hospital ? (
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-4">
                                    <ImageNameCard person={hospital} />
                                </div>
                                <div className="col-lg-8">
                                    <DetailsCard
                                        person={
                                            removeKey(
                                                [hospital],
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
                                    navigate("../hospital/edit-profile")
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

export default HospitalDashboard
