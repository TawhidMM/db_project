import React, { useState, useEffect } from "react";
import axios from "axios";

import PatientHeader from "../components/PatientHeader";
import TableHeaders from "../components/TableHeaders";
import removeKey from "../util/RemoveKey";

const PatientHistory = () => {

    const [appointments, setAppointments] = useState([])
    const [showAppointments, setShowAppointments] = useState(false)
    const [appointmentLinks, setAppointmentLinks] = useState([])

    const [runningMedicines, setRunningMedicines] = useState([])
    const [pastMedicines, setPastMedicines] = useState([])
    const [showMedicines, setShowMedicines] = useState(false)
    const [doctorList, setDoctorList] = useState([])
    const [selectedDoc, setSelectedDoc] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(0)
    const[medLinks, setMedLinks] = useState(
        {runningMedLinks:[], pastMedLinks:[]})


    const toBeRemovedKey = ["MED_URL"]

    const handleGetMedClick = async () => {
        await getMyDocs()
        await getMedicines()
    };

    const handleDoctorFilter = (event) => {
        setSelectedDoc(event.target.value)
    }

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value)
    }

    useEffect(() => {
        if (selectedDoc || selectedMonth) {
            (async () => {
                console.log(selectedDoc + "selected doctor")
                await getMedicines()
            })()
        }
    }, [selectedDoc, selectedMonth])


    const getMedicines = async () => {

    try {
        const response = await axios.get(
            `/patient/medicine/?month=${selectedMonth}&doctor=${selectedDoc}`)

        setRunningMedicines(response.data.running)
        setPastMedicines(response.data.past)

        setMedLinks({
            ...medLinks,
            ['pastMedLinks']: response.data.past.map(med => med.MED_URL),
            ['runningMedLinks']: response.data.running.map(med => med.MED_URL)
        })


        setShowAppointments(false)
        setShowMedicines(true)
    } catch (error) {

        console.error("Error fetching runningMedicines:", error)
    }
}


    const getMyDocs = async () => {
    try {

        const response = await axios.get("/patient/my-doctors")
        setDoctorList(response.data)

        console.log(response.data)
    } catch (error) {
        console.error("Error fetching my doctors", error)
    }
}


    const getAppointments = async () => {

        try {
            const response = await axios.get(
                "/patient/history/appointmentList"
            );

            setAppointments(response.data)
            console.log(response.data)

            setAppointmentLinks(response.data.map(a=>
                `http://localhost:3000/patient/history/appointment/?appointment_id=${a.APPOINTMENT_ID}`)
            )


            setShowMedicines(false)
            setShowAppointments(true)

        } catch (error) {
            console.error("Error fetching medicines:", error)
        }
    };

    return (
        <>
            <div>
                <PatientHeader />
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
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleDoctorFilter}
                            >
                                <option value=''>All</option>
                                {doctorList.map(({ DOCTOR_NAME }) => (
                                    <option
                                        key={DOCTOR_NAME}
                                        value={DOCTOR_NAME}
                                    >
                                        {DOCTOR_NAME}
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
                                    highlightedInfo={/*removeKey(*/runningMedicines/*,toBeRemovedKey)*/}
                                    highlightedLinks={medLinks.runningMedLinks}
                                    info={/*removeKey(*/pastMedicines/*,toBeRemovedKey)*/}
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

export default PatientHistory;

