import PatientHeader from "../components/PatientHeader"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import TableHeaders from "../components/TableHeaders"

import removeKey from "../util/RemoveKey"

const Find = () => {
    const [speciality, setSpecialty] = useState([])
    const [city, setCity] = useState([])
    const [selectedSpec, setSelectedSpec] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [doctors, setDoctors] = useState([])
    const [showDoctors, setShowDoctors] = useState(false)

    // const navigate = useNavigate()

    // // keys will be removed for Details Card
    // const toBeRemovedKey = ["PHOTO_URL"]

    useEffect(() => {
        ;(async () => {
            try {
                const response = await axios.get("/patient/find")
                setSpecialty(response.data.allSpeciality)
                setCity(response.data.allCity)
            } catch (error) {
                console.error("Error fetching patient information:", error)
            }
        })()

        if (selectedSpec || selectedCity) {
            ;(async () => {
                await getDoctors()
            })()
        }
    }, [selectedSpec, selectedCity])

    console.log(selectedCity, selectedSpec)

    const getDoctors = async () => {
        try {
            setShowDoctors(false)
            if (selectedSpec === "" || selectedCity === "") return
            const response = await axios.get(
                `/patient/find/search/?speciality=${selectedSpec}&city=${selectedCity}`
            )
            setDoctors(response.data)
            console.log(response.data)

            if (response.data.length > 0) setShowDoctors(true)
        } catch (error) {
            console.error("Error fetching my doctors", error)
        }
    }

    return (
        <>
            <div>
                <PatientHeader />
            </div>
            <center>
                <h2>Find your Doctor</h2>
                <div className="row">
                    <div className="col-sm-4 mt-5">
                        <input
                            className="form-control"
                            list="speciality"
                            placeholder="Select speciality"
                            onChange={(e) => setSelectedSpec(e.target.value)}
                            required={true}
                        />
                        <datalist id="speciality">
                            {speciality.map(({ SPECIALIST }) => (
                                <option key={SPECIALIST} value={SPECIALIST} />
                            ))}
                        </datalist>
                    </div>
                    <div className="col-sm-4 mt-5">
                        <input
                            className="form-control"
                            list="city"
                            placeholder="Select city"
                            onChange={(e) => setSelectedCity(e.target.value)}
                            required={true}
                        />
                        <datalist id="city">
                            {city.map(({ CITY }) => (
                                <option key={CITY} value={CITY} />
                            ))}
                        </datalist>
                    </div>
                </div>

                {showDoctors && (
                    <div>
                        <h2>Doctors</h2>
                        <TableHeaders
                            info={doctors}
                            highlightedInfo={[]}
                            links={[]}
                        />
                    </div>
                )}
            </center>
        </>
    )
}

export default Find
