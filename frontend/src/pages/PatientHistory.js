import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ImageNameCard from "../components/ImageNameCard";
import PatientHeader from "../components/PatientHeader";
import DetailsCard from "../components/DetailsCard";
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





    const handleGetMedClick = async () => {
        await getMyDocs()
        await getMedicines()
    }

    const handleDoctorFilter = async(event) =>{
        setSelectedDoc(event.target.value)
    }

    useEffect( () => {
        if(selectedDoc) {
            (async()=>{
                console.log(selectedDoc + 'selected doctor')
                await getMedicines()
            })()
        }
    }, [selectedDoc])



let runningMedLinks = []
    let pastMedLinks = []

    const getMedicines = async () => {
    setSelectedDoc('')
    try {
        const response = await axios.get(`/patient/medicine/?month=100&doctor=${selectedDoc}`); // Replace with runningMedicines API endpoint

        setRunningMedicines(response.data.running)
        setPastMedicines(response.data.past)

        runningMedLinks = response.data.running.map(med => med.MED_URL)
        pastMedLinks = response.data.past.map(med => med.MED_URL)

        console.log(response.data.running)

        setShowAppointments(false);
        setShowMedicines(true);
    } catch (error) {

        console.error("Error fetching runningMedicines:", error)
    }
}


    const getMyDocs = async () => {
    try {

        const response = await axios.get("/patient/my-doctors")
        setDoctorList(response.data)

        console.log(doctorList)
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

            setAppointmentLinks(response.data.map(a=>
                `http://localhost:3000/patient/history/appointment/?appointment_id=${a.APPOINTMENT_ID}`)
            )


            setShowMedicines(false)
            setShowAppointments(true)

        } catch (error) {
            console.error("Error fetching medicines:", error);
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
                            <select className="form-select" aria-label="Default select example"
                                    onChange={handleDoctorFilter}
                            >
                                {doctorList.map(({DOCTOR_NAME}) =>
                                    <option key={DOCTOR_NAME} value={DOCTOR_NAME}> {DOCTOR_NAME} </option>
                                )}
                            </select>
                            <div>
                                <h2>Used Medicines</h2>
                                <TableHeaders
                                    highlightedInfo={runningMedicines}
                                    highlightedLinks={runningMedLinks}
                                    info={pastMedicines}
                                    links={pastMedLinks}
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
    );
};

export default PatientHistory;
