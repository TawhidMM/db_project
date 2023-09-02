import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ImageNameCard from "../components/ImageNameCard";
import PatientHeader from "../components/PatientHeader";
import DetailsCard from "../components/DetailsCard";
import TableHeaders from "../components/TableHeaders";

import removeKey from "../util/RemoveKey";

const PatientDashboard = () => {

    const [patient, setPatient] = useState(null)

    const [runningMedicines, setRunningMedicines] = useState([])
    const [pastMedicines, setPastMedicines] = useState([])
    const [showMedicines, setShowMedicines] = useState(false)
    const [doctorList, setDoctorList] = useState([])
    const [selectedDoc, setSelectedDoc] = useState('')

    const navigate = useNavigate()

    // keys will be removed for Details Card
    const toBeRemovedKey = ['PHOTO_URL']


    useEffect(() => {
        const getPatient = async () => {
            try {
                const response = await axios.get("/patient/dashboard"); // Replace with patient API endpoint
                setPatient(response.data[0])

            } catch (error) {
                console.error("Error fetching patient information:", error);
            }
        };

        (async ()=>{
            await getPatient()
        })()
    }, [])



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


    const getMedicines = async () => {
        setSelectedDoc('')
        try {
            const response = await axios.get(`/patient/medicine/?month=100&doctor=${selectedDoc}`); // Replace with runningMedicines API endpoint


            setRunningMedicines(response.data.running)
            setPastMedicines(response.data.past)
            setShowMedicines(true)
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


    return (
        <>
            <div>
                <PatientHeader/>
                <center>
                    <h1>Patient Dashboard</h1>
                    {patient ? (
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-4">
                                    <ImageNameCard person={patient}/>
                                </div>
                                <div className="col-lg-8">
                                    <DetailsCard person={removeKey(patient,toBeRemovedKey)} />
                                </div>
                            </div>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={event =>
                                    navigate('../patient/edit-profile')}
                            >
                                Edit Profile
                            </button>
                        </div>

                    ) : (
                        <p>No data</p>
                    )}

                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleGetMedClick}
                    >
                        Show recent medications
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
                                <TableHeaders info={pastMedicines} highlightedInfo={runningMedicines}/>
                            </div>
                        </>
                    )}
                </center>
            </div>
        </>
    );
};

export default PatientDashboard;

