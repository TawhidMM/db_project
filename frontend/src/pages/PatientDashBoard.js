import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ImageNameCard from "../components/ImageNameCard";
import PatientHeader from "../components/PatientHeader";
import DetailsCard from "../components/DetailsCard";
import TableHeaders from "../components/TableHeaders";

import removeKey from "../util/RemoveKey";

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [showMedicines, setShowMedicines] = useState(false);
    const navigate = useNavigate();

    // keys will be removed for Details Card
    const toBeRemovedKey = ["PHOTO_URL"];

    useEffect(() => {
        const getPatient = async () => {
            try {
                const response = await axios.get("/patient/dashboard"); // Replace with patient API endpoint
                setPatient(response.data[0]);
            } catch (error) {
                console.error("Error fetching patient information:", error);
            }
        };

        (async () => {
            await getPatient();
        })();
    }, []);

    // const getMedicines = async () => {
    //     try {
    //         const response = await axios.get("/patient/medicine/?month=100"); // Replace with medicines API endpoint
    //         setMedicines(response.data);
    //         setShowMedicines(true);
    //         console.log(medicines);
    //     } catch (error) {
    //         console.error("Error fetching medicines:", error);
    //     }
    // };

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
                                        person={removeKey(
                                            patient,
                                            toBeRemovedKey
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No data</p>
                    )}

                    {/* <button
                        className="btn btn-primary"
                        type="button"
                        onClick={getMedicines}
                    >
                        Show recent medications
                    </button>

                    {showMedicines && (
                        <div>
                            <h2>Used Medicines</h2>
                            <TableHeaders info={medicines}/>
                        </div>
                    )} */}
                </center>
            </div>
        </>
    );
};

export default PatientDashboard;
