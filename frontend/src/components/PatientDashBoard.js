// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientHeader from "./PatientHeader";

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [showMedicines, setShowMedicines] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getPatient = async () => {
            try {
                const response = await axios.get("/patient/dashboard"); // Replace with patient API endpoint
                setPatient(response.data[0]);
                //console.log(patient);
            } catch (error) {
                console.error("Error fetching patient information:", error);
            }
        };

        getPatient();
    }, []);

    const getMedicines = async () => {
        try {
            const response = await axios.get("/patient/medicine/?month=100"); // Replace with medicines API endpoint
            setMedicines(response.data);
            setShowMedicines(true);
            console.log(medicines);
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };


    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
    };

    const cellStyle = {
        border: "1px solid #ccc",
        padding: "8px",
        textAlign: "left",
    };

    const headerStyle = {
        backgroundColor: "#f5f5f5",
    };

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
                                    <div className="card mb-4">
                                        <div className="card-body text-center">
                                            <img src={patient.PHOTO_URL} alt="avatar"
                                                 className="rounded-circle img-fluid" /*style="width: 150px;"*//>
                                                <h5 className="my-3">{patient.FULLNAME}</h5>
                                                {/*/*<!-- <p class="text-muted mb-1">Full Stack Developer</p>
                                                <p class="text-muted mb-4">Bay Area, San Francisco, CA</p> -->*/}
                                                <div className="d-flex justify-content-center mb-2">
                                                    {/*/*<!-- <button type="button" class="btn btn-primary">Follow</button>
                                                    <button type="button" class="btn btn-outline-primary ms-1">Message</button> -->*/}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Full Name</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{patient.FULLNAME}</p>
                                                </div>
                                            </div>
                                            <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Email</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{patient.EMAIL}</p>
                                                    </div>
                                                </div>
                                                <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <p className="mb-0">Gender</p>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <p className="text-muted mb-0">{patient.GENDER}</p>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <p className="mb-0">Mobile</p>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <p className="text-muted mb-0">(098) 765-4321</p>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <p className="mb-0">Address</p>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                                                </div>
                                                            </div>
                                                        <hr/>
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <p className="mb-0">DOB</p>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <p className="text-muted mb-0">{patient.DOB}</p>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <p className="mb-0">Blood Group</p>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <p className="text-muted mb-0">{patient.BLOOD_GROUP}</p>
                                                            </div>
                                                        </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    ) : (
                        <p>No data</p>
                    )}

                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={getMedicines}
                    >
                        Show recent medications
                    </button>

                    {showMedicines && (
                        <div>
                            <h2>Used Medicines</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name </th>
                                        <th>Dosage </th>
                                        <th>Frequency </th>
                                        <th>Duration </th>
                                        <th>Timing </th>
                                        <th>Prescribed by </th>
                                        <th>Prescribed On </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicines.map((medicine, index) => (
                                        <tr key={index}>
                                            <td>{medicine.MEDICINE_NAME}</td>
                                            <td>{medicine.DOSAGE_AMOUNT}</td>
                                            <td>{medicine.DOSAGE_FREQUENCY}</td>
                                            <td>{medicine.DURATION}</td>
                                            <td>{medicine.TIMING}</td>
                                            <td>Dr. {medicine.DRNAME}</td>
                                            <td>{medicine.DATEON}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </center>
            </div>
        </>
    );
};

export default PatientDashboard;

