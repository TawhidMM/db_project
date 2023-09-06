import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import PatientHeader from "../components/PatientHeader"
import TableHeaders from "../components/TableHeaders"
import removeKey from "../util/RemoveKey"
import "./AppointmentPrescription.css"
import MedList from "../components/MedList"
import DiagnosedList from "../components/DiagnosedList"
import TestList from "../components/TestList"

const AppointmentPrescription = () => {
    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search)
    const appointment_id = query.get("appointment_id")
    const [details, setDetails] = useState(null)
    const [medicines, setMedicines] = useState(null)
    const [diagnosed, setDiagnosed] = useState(null)
    const [suggestedTest, setSuggestedTest] = useState(null)
    const [showMedicines, setShowMedicines] = useState(false)

    useEffect(() => {
        const getPrescription = async () => {
            try {
                console.log(appointment_id)
                const response = await axios.get(
                    `/patient/history/appointment?appointment_id=${appointment_id}`
                )
                //console.log(response.data);
                setDetails(response.data.details[0])
                setMedicines(response.data.medicines)
                setDiagnosed(response.data.diagnosed)
                setSuggestedTest(response.data.test)

                setShowMedicines(true)
                console.log(details)
                console.log(medicines)
                console.log(diagnosed)
                console.log(suggestedTest)
            } catch (error) {
                console.error("Error fetching patient information:", error)
            }
        }
        getPrescription()
    }, [])

    // const getPrescription2 = async () => {
    //     try {
    //         console.log(appointment_id)
    //         const response = await axios.get(
    //             `/patient/history/appointment?appointment_id=${appointment_id}`
    //         )
    //         setDetails(response.data.details[0])
    //         setMedicines(response.data.medicines)
    //         setDiagnosed(response.data.diagnosed)
    //         setSuggestedTest(response.data.test)

    //         console.log(details)
    //         console.log(medicines)
    //         console.log(diagnosed)
    //         console.log(suggestedTest)
    //         setShowMedicines(true)
    //     } catch (error) {
    //         console.error("Error fetching patient information:", error)
    //     }
    // }

    return (
        <>
            <PatientHeader />
            {/* <button
                className="btn btn-primary"
                type="button"
                onClick={getPrescription2}
            >
                show prescription
            </button> */}
            {showMedicines && (
                <center>
                    <page className="page" size="A4">
                        <main>
                            <table>
                                <tbody>
                                    <tr
                                        style={{
                                            borderWidth: "1px",
                                            borderColor: "#aaaaaa",
                                            borderStyle: "solid",
                                        }}
                                    >
                                        <td className="header" colSpan="2">
                                            <div className="chamber-details">
                                                <div className="logo">
                                                    <img
                                                        src="https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png"
                                                        alt="chamber logo"
                                                    />
                                                </div>
                                                <div className="credentials">
                                                    <div className="name_degree">
                                                        <h1>
                                                            {details.DRNAME}
                                                        </h1>
                                                        ,
                                                        <span>
                                                            {" "}
                                                            MBChB (DMC){" "}
                                                        </span>
                                                        <span>
                                                            {
                                                                details.SPECIALIZATION
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="license">
                                                        <p>
                                                            MP no.{" "}
                                                            {details.DOCTOR_ID}
                                                        </p>
                                                        <p>
                                                            Email :{" "}
                                                            {details.EMAIL}
                                                        </p>
                                                    </div>

                                                    <div className="chamber">
                                                        <p>
                                                            {
                                                                details.CENTER_NAME
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="address">
                                                        {details.MEDADDRESS}
                                                    </div>
                                                    <div className="contacts">
                                                        <p>Cell no. 0552461</p>
                                                        <p>{details.EMAIL_1}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr
                                        style={{
                                            borderWidth: "1px",
                                            borderColor: "#aaaaaa",
                                            borderStyle: "solid",
                                        }}
                                    >
                                        <td className="patient" colSpan="2">
                                            <div>
                                                <p className="sl">
                                                    <div
                                                        className="container"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <div>
                                                            PRESCRIPTION NO.{" "}
                                                            {
                                                                details.APPOINTMENT_ID
                                                            }
                                                        </div>
                                                        <div>
                                                            DATE.{" "}
                                                            {
                                                                details.APPOINTMENT_DATE
                                                            }
                                                        </div>
                                                    </div>
                                                </p>

                                                <p className="patient-details">
                                                    <u>
                                                        NAME:{" "}
                                                        {details.PATIENTNAME}
                                                    </u>{" "}
                                                    , AGE: {details.AGE},
                                                    GENDER: {details.GENDER}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr
                                        style={{
                                            borderWidth: "1px",
                                            borderColor: "#aaaaaa",
                                            borderStyle: "solid",
                                        }}
                                    >
                                        <td
                                            className="d-info"
                                            style={{
                                                borderWidth: "1px",
                                                borderColor: "#aaaaaa",
                                                borderStyle: "solid",
                                            }}
                                        >
                                            <div className="symp">
                                                <h1>VITAL SIGNS</h1>
                                                <ul>
                                                    <li>
                                                        B/P:{" "}
                                                        {details.BLOOD_PRESSURE}{" "}
                                                        mmHg
                                                    </li>
                                                    <li>
                                                        Heart Rate:{" "}
                                                        {details.HEART_RATE} bpm
                                                    </li>
                                                    <li>
                                                        Weight: {details.WEIGHT}{" "}
                                                        kg
                                                    </li>
                                                    <li>
                                                        Height: {details.HEIGHT}{" "}
                                                        cm
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="symp">
                                                <h1>SYMPTOMPS</h1>
                                                <ul>
                                                    <li>{details.SYMPTOMS}</li>
                                                </ul>
                                            </div>
                                            <div className="symp">
                                                <h1>DIAGNOSIS</h1>
                                                <ul>
                                                    <DiagnosedList
                                                        diseases={diagnosed}
                                                    />
                                                </ul>
                                            </div>
                                            <div className="test">
                                                <h1>TESTS</h1>
                                                <ul>
                                                    <TestList
                                                        test={suggestedTest}
                                                    />
                                                </ul>
                                            </div>
                                            <div className="adv">
                                                <h1>ADVICE</h1>
                                                <p></p>
                                            </div>
                                        </td>
                                        <td className="medicine">
                                            <span style={{ fontSize: "1.7em" }}>
                                                R<sub>x</sub>
                                            </span>

                                            <div className="med-list">
                                                <MedList
                                                    medicines={medicines}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="re-visit">Re-Visit</td>
                                        <td className="signature">Signature</td>
                                    </tr>
                                </tbody>
                            </table>
                        </main>
                    </page>
                </center>
            )}
        </>
    )
}

export default AppointmentPrescription
