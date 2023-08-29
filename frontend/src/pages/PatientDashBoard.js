// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../components/PatientHeader";
import "./PatientDashBoard.css";

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [showMedicines, setShowMedicines] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
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
                <PatientHeader />
                <center>
                    <h1>Patient Dashboard</h1>
                </center>

                {patient ? (
                    <div class="container">
                        <div class="main-body">
                            <div class="row gutters-sm">
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center">
                                                <img
                                                    src={patient.PHOTO_URL}
                                                    alt="Admin"
                                                    class="rounded-circle"
                                                    width="150"
                                                />
                                                <div class="mt-3">
                                                    <h4>{patient.FULLNAME}</h4>

                                                    <p class="text-muted font-size-sm">
                                                        Bay Area, San Francisco,
                                                        CA
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">
                                                        Full Name
                                                    </h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {patient.FULLNAME}
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Email</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {patient.EMAIL}
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Phone</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    (239) 816-9029
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Gender</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {patient.GENDER}
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">
                                                        Address
                                                    </h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    Bay Area, San Francisco, CA
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">
                                                        Date of Birth
                                                    </h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {patient.DOB}
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">
                                                        Blood Group
                                                    </h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {patient.BLOOD_GROUP}
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <a
                                                        class="btn btn-info "
                                                        target="__blank"
                                                    >
                                                        Edit
                                                    </a>
                                                </div>
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
                    class="btn btn-info "
                    target="__blank"
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
            </div>
        </>
    );
};

export default PatientDashboard;
