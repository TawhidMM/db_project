import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ImageNameCard from "../components/ImageNameCard";
import PatientHeader from "../components/PatientHeader";
import DetailsCard from "../components/DetailsCard";
import TableHeaders from "../components/TableHeaders";
import removeKey from "../util/RemoveKey";

const PatientHistory = () => {
    const [medicines, setMedicines] = useState([]);
    const [showMedicines, setShowMedicines] = useState(false);
    const [Appointments, setAppointments] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);
    const navigate = useNavigate();

    // keys will be removed for Details Card
    const toBeRemovedKey = ["PHOTO_URL"];

    const getMedicines = async () => {
        try {
            const response = await axios.get("/patient/medicine/?month=100");
            setMedicines(response.data);
            setShowAppointments(false);
            setShowMedicines(true);
            console.log(medicines);
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };

    const getAppointments = async () => {
        try {
            const response = await axios.get(
                "/patient/history/appointmentList"
            );
            setAppointments(response.data);
            setShowMedicines(false);
            setShowAppointments(true);
            console.log(Appointments);
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
                        onClick={getMedicines}
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
                        <div>
                            <h2>Used Medicines</h2>
                            <TableHeaders info={medicines} />
                        </div>
                    )}
                    {showAppointments && (
                        <div>
                            <h2>recent appointments</h2>
                            <TableHeaders info={Appointments} />
                        </div>
                    )}
                </center>
            </div>
        </>
    );
};

export default PatientHistory;
