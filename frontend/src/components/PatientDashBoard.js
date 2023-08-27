// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [showMedicines, setShowMedicines] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch patient information when the component mounts
        const getPatient = async () => {
            try {
                const response = await axios.get("/patient/dashboard"); // Replace with patient API endpoint
                setPatient(response.data[0]);
                console.log(patient);
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

    const handleLogout = async () => {
        try {
            await axios.post("/patient/logout"); // Replace with your logout API endpoint
            // Redirect to the login page
            navigate("/login"); // Replace with the actual login route
        } catch (error) {
            console.error("Error logging out:", error);
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
                <center>
                    <h1>Patient Dashboard</h1>

                    {patient ? (
                        <div>
                            <h2>Patient Information</h2>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                            <br />
                            <img
                                src={patient.PHOTO_URL}
                                alt="Displayed Image"
                            />
                            <p> {patient.FULLNAME}</p>
                            Email: {patient.EMAIL}
                            <br />
                            Gender: {patient.GENDER}
                            <br />
                            Date of Birth: {patient.DOB}
                            <br />
                            Blood Group: {patient.BLOOD_GROUP}
                            <br />
                            <br />
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

// async function PatientDashBoard() {
//     useEffect(() =>{
//         const [dashdata, setData]= useState([{}]);

//         use
//     } )
//     try {
//         const response = await axios
//             .get("/patient/dashboard")
//             .then((response) => {
//                 setData(response.data);
//             });

//         if (response.status === 200) {
//             //const { id: id1, fullName: fullName1 } = response.data;
//             //const dashData = response.data;
//             console.log(response.data);
//         } else if (response.status === 400)
//             console.log("no response found dashboard");
//     } catch (error) {
//         console.error("dashboard error ", error);
//     }
//     return (
//         <div>
//             welcome {response.data.FULLNAME} {response.data.email}
//         </div>
//     );
// }

// export default PatientDashBoard;
