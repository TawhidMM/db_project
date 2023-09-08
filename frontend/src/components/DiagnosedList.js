import React from "react";
import "../pages/AppointmentPrescription.css";

function DiagnosedList({ diseases }) {
    return (
        <>
            {diseases.map((dis, index) => (
                <li key={index}>
                    <a href={dis.DESCRIPTION}>{dis.DISEASE_NAME} </a>
                </li>
            ))}
        </>
    );
}

export default DiagnosedList;
