import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PatientHeader from "../components/PatientHeader";
import TableHeaders from "../components/TableHeaders";
import removeKey from "../util/RemoveKey";
import "./AppointmentPrescription.css";

const AppointmentPrescription = () => {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const appointment_id = query.get("appointment_id");
    const [prescription, setPrescription] = useState([]);

    useEffect(() => {
        const getPrescription = async () => {
            try {
                console.log(appointment_id);
                const response = await axios.get(
                    `/patient/history/appointment?appointment_id=${appointment_id}`
                );
                setPrescription(response.data);

                console.log(prescription);
                const details = prescription.details;
                console.log(details);
            } catch (error) {
                console.error("Error fetching patient information:", error);
            }
        };
        getPrescription();
    }, []);

    return (
        <>
            <PatientHeader />
            <button className="btn btn-primary" type="button">
                show prescription
            </button>
            {/* <page size="A4">
                <main>
                    <table>
                        <tr>
                            <td class="header" colspan="2">
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
                        <tr>
                            <td class="patient" colspan="2">
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
                                        lorem ipsum dolor sit amet condfesaki
                                        likam
                                    </p>
                                </div>
                            </td>
                            <td class="medicine">
                                <div class="med-list">
                                    <div class="item">
                                        <div class="name_type">
                                            <h2>Drug Name</h2>
                                            <p>Drug Type</p>
                                        </div>
                                        <div class="weight_generic">
                                            <span>500mg</span>
                                            <p>Generic Name</p>
                                        </div>
                                        <div class="how_when">
                                            <p>
                                                Take <span>1+1+1+1</span> for{" "}
                                                <span>CONTINUE</span>
                                            </p>
                                            <span>AFTER MEAL</span>
                                            <p>(25 doses)</p>
                                        </div>
                                    </div>
                                    <div class="devider"></div>
                                    <div class="item">
                                        <div class="name_type">
                                            <h2>Drug Name</h2>
                                            <p>Drug Type</p>
                                        </div>
                                        <div class="weight_generic">
                                            <span>500mg</span>
                                            <p>Generic Name</p>
                                        </div>
                                        <div class="how_when">
                                            <p>
                                                Take <span>1+1+1+1</span> for{" "}
                                                <span>CONTINUE</span>
                                            </p>
                                            <span>AFTER MEAL</span>
                                            <p>(25 doses)</p>
                                        </div>
                                    </div>
                                    <div class="devider"></div>
                                    <div class="item">
                                        <div class="name_type">
                                            <h2>Drug Name</h2>
                                            <p>Drug Type</p>
                                        </div>
                                        <div class="weight_generic">
                                            <span>500mg</span>
                                            <p>Generic Name</p>
                                        </div>
                                        <div class="how_when">
                                            <p>
                                                Take <span>1+1+1+1</span> for{" "}
                                                <span>CONTINUE</span>
                                            </p>
                                            <span>AFTER MEAL</span>
                                            <p>(25 doses)</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="re-visit">Re-Visit</td>
                            <td class="signature">Signature</td>
                        </tr>
                    </table>
                </main>
            </page> */}
        </>
    );
};

export default AppointmentPrescription;
