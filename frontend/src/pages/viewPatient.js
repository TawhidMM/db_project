import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

import ImageNameCard from "../components/ImageNameCard"
import DoctorHeader from "../components/DoctorHeader"
import DetailsCard from "../components/DetailsCard"
import TableHeaders from "../components/TableHeaders"
import HeightChart from "../components/HeightChart"

import removeKey from "../util/RemoveKey"

const PatientDashboard = () => {
    const query = new URLSearchParams(useLocation().search)
    const patient_id = "P" + query.get("patient_id")

    const [patient, setPatient] = useState(null)
    const [height, setHeight] = useState([])

    const [appointments, setAppointments] = useState([])
    const [showAppointments, setShowAppointments] = useState(false)
    const [appointmentLinks, setAppointmentLinks] = useState([])

    const [runningMedicines, setRunningMedicines] = useState([])
    const [pastMedicines, setPastMedicines] = useState([])
    const [showMedicines, setShowMedicines] = useState(false)
    const [doctorList, setDoctorList] = useState([])
    const [selectedDoc, setSelectedDoc] = useState("")
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [medLinks, setMedLinks] = useState({
        runningMedLinks: [],
        pastMedLinks: [],
    })

    const navigate = useNavigate()

    const handleGetMedClick = async () => {
        await getMyDocs()
        await getMedicines()
    }

    const handleDoctorFilter = (event) => {
        setSelectedDoc(event.target.value)
    }

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value)
    }

    // keys will be removed for Details Card

    useEffect(() => {
        const getPatient = async () => {
            try {
                const response = await axios.get(
                    `/doctor/view/patient/?patient_id=${patient_id}`
                ) // Replace with patient API endpoint
                setPatient(response.data.data[0])
                setHeight(response.data.data2)
            } catch (error) {
                console.error("Error fetching patient information:", error)
            }
        }

        ;(async () => {
            await getPatient()
        })()

        if (selectedDoc || selectedMonth) {
            ;(async () => {
                console.log(selectedDoc + "selected doctor")
                await getMedicines()
            })()
        }
    }, [selectedDoc, selectedMonth])
    const getMedicines = async () => {
        try {
            const response = await axios.get(
                `/doctor/view/patient/medicine/?patient_id=${patient_id}&month=${selectedMonth}&doctor=${selectedDoc}`
            )

            setRunningMedicines(response.data.running)
            setPastMedicines(response.data.past)

            setMedLinks({
                ...medLinks,
                ["pastMedLinks"]: response.data.past.map((med) => med.MED_URL),
                ["runningMedLinks"]: response.data.running.map(
                    (med) => med.MED_URL
                ),
            })

            setShowAppointments(false)
            setShowMedicines(true)
        } catch (error) {
            console.error("Error fetching runningMedicines:", error)
        }
    }

    const getMyDocs = async () => {
        try {
            const response = await axios.get(
                `/doctor/view/patient/my-doctors/?patient_id=${patient_id}`
            )
            setDoctorList(response.data)

            console.log(response.data)
        } catch (error) {
            console.error("Error fetching my doctors", error)
        }
    }

    const getAppointments = async () => {
        try {
            const response = await axios.get(
                `/doctor/view/patient/appointmentList/?patient_id=${patient_id}`
            )

            setAppointments(response.data)
            console.log(response.data)

            setAppointmentLinks(
                response.data.map(
                    (a) =>
                        `http://localhost:3000/patient/history/appointment/?appointment_id=${a.APPOINTMENT_ID}`
                )
            )

            setShowMedicines(false)
            setShowAppointments(true)
        } catch (error) {
            console.error("Error fetching medicines:", error)
        }
    }

    const toBeRemovedKey = ["MED_URL"]

    return (
        <>
            <div>
                <DoctorHeader />
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

                            <div className="App">
                                <HeightChart data={height} />
                            </div>
                        </div>
                    ) : (
                        <p>No data</p>
                    )}
                </center>

                <center>
                    <h1>History</h1>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleGetMedClick}
                    >
                        Show recent medications
                    </button>

                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={getAppointments}
                    >
                        Show recent Appointment List
                    </button>
                    {showMedicines && (
                        <>
                            {" "}
                            <br />
                            <label>Prescribed by: </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleDoctorFilter}
                            >
                                <option value="">All</option>
                                {doctorList.map(({ DOCTOR_NAME }) => (
                                    <option
                                        key={DOCTOR_NAME}
                                        value={DOCTOR_NAME}
                                    >
                                        Dr. {DOCTOR_NAME}
                                    </option>
                                ))}
                            </select>
                            <label>Since: </label>
                            <select
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            >
                                <option value="0">
                                    Select a number of months
                                </option>
                                <option value="1">Last 1 months</option>
                                <option value="2">Last 2 months</option>
                                <option value="6">Last 6 months</option>
                                <option value="12">Last 1 year</option>
                                <option value="24">Last 2 years</option>
                                <option value="60">Last 5 years</option>
                                <option value="120">Last 10 years</option>
                                <option value="500">Alltime</option>
                            </select>
                            <div>
                                <h2>Used Medicines</h2>
                                <TableHeaders
                                    highlightedInfo={
                                        /*removeKey(*/ runningMedicines /*,toBeRemovedKey)*/
                                    }
                                    highlightedLinks={medLinks.runningMedLinks}
                                    info={
                                        /*removeKey(*/ pastMedicines /*,toBeRemovedKey)*/
                                    }
                                    links={medLinks.pastMedLinks}
                                />
                            </div>
                        </>
                    )}
                    {showAppointments && (
                        <div>
                            <h2>recent appointments</h2>
                            <TableHeaders
                                info={appointments}
                                highlightedInfo={[]}
                                links={appointmentLinks}
                            />
                        </div>
                    )}
                </center>
            </div>
        </>
    )
}

export default PatientDashboard
