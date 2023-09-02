import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PatientHeader from "../components/PatientHeader";
import TableHeaders from "../components/TableHeaders";
import removeKey from "../util/RemoveKey";
import "./AppointmentPrescription.css";
import MedList from "../components/MedList";

const AppointmentPrescription = () => {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const appointment_id = query.get("appointment_id");
    const [details, setDetails] = useState(null);
    const [medicines, setMedicines] = useState(null);
    const [showMedicines, setShowMedicines] = useState(false);

    useEffect(() => {
        const getPrescription = async () => {
            try {
                console.log(appointment_id);
                const response = await axios.get(
                    `/patient/history/appointment?appointment_id=${appointment_id}`
                );
                setDetails(response.data.details[0]);
                setMedicines(response.data.medicines);

                console.log(details);
                console.log(medicines);
            } catch (error) {
                console.error("Error fetching patient information:", error);
            }
        };
        getPrescription();
    }, []);
    const getPrescription2 = async () => {
        try {
            console.log(appointment_id);
            const response = await axios.get(
                `/patient/history/appointment?appointment_id=${appointment_id}`
            );
            setDetails(response.data.details[0]);
            setMedicines(response.data.medicines);

            console.log(details);
            console.log(medicines);
            setShowMedicines(true);
        } catch (error) {
            console.error("Error fetching patient information:", error);
        }
    };

    return (
        <>
            <PatientHeader />
            <button
                className="btn btn-primary"
                type="button"
                onClick={getPrescription2}
            >
                show prescription
            </button>
            {showMedicines && (
                // <page className="page" size="A4">
                <table>
                    <tbody>
                        <tr>
                            <td class="header" colSpan="2">
                                <div class="chamber-details">
                                    <div class="logo">
                                        <img
                                            src="https://brandmark.io/logo-rank/random/beats.png"
                                            alt="chamber logo"
                                        />
                                    </div>
                                    <div class="credentials">
                                        <div class="name_degree">
                                            <h1>{details.DRNAME}</h1>,
                                            <span>MBChB (DMC)</span>
                                            <span>
                                                {details.SPECIALIZATION}
                                            </span>
                                        </div>
                                        <div class="license">
                                            <p>MP no. {details.DOCTOR_ID}</p>
                                            <p>Email : {details.EMAIL}</p>
                                        </div>
                                        <div class="chamber">
                                            <p>{details.CENTER_NAME}</p>
                                        </div>
                                        <div class="address">
                                            {details.MEDADDRESS}
                                        </div>
                                        <div class="contacts">
                                            <p>Cell no. 0552461</p>
                                            <p>an-email@mail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td class="patient" colSpan="2">
                                <div>
                                    <p class="sl">
                                        PRESCRIPTION NO.{" "}
                                        {details.APPOINTMENT_ID}
                                    </p>
                                    <p class="patient-details">
                                        <u>NAME: {details.PATIENTNAME}</u> ,
                                        AGE: {details.AGE}, GENDER:{" "}
                                        {details.GENDER}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tr>
                        <td class="d-info">
                            <div class="symp">
                                <h1>SYMPTOMPS</h1>
                                <ul>
                                    <li>Cold</li>
                                    <li>Fever</li>
                                    <li>Itch</li>
                                    <li>Insomnia</li>
                                </ul>
                            </div>
                            <div class="test">
                                <h1>TESTS</h1>
                                <ul>
                                    <li>Cold</li>
                                    <li>Fever</li>
                                    <li>Itch</li>
                                    <li>Insomnia</li>
                                </ul>
                            </div>
                            <div class="adv">
                                <h1>ADVICE</h1>
                                <p>
                                    lorem ipsum dolor sit amet condfesaki likam
                                </p>
                            </div>
                        </td>
                        <td class="medicine">
                            <div class="med-list">
                                <MedList medicines={medicines} />
                            </div>
                        </td>
                    </tr>
                    <tbody>
                        <tr>
                            <td class="re-visit">Re-Visit</td>
                            <td class="signature">Signature</td>
                        </tr>
                    </tbody>
                </table>
                /* </main>*/
                // </page>
            )}
        </>
    );
};

export default AppointmentPrescription;
