import React from "react";
import "../pages/AppointmentPrescription.css";

function DiagnosedList({ diseases }) {
    return (
        <>
            {diseases.map((dis) => (
                <li>
                    <a href={dis.DESCRIPTION}>{dis.DISEASE_NAME} </a>
                </li>
            ))}
        </>
    );
}

export default DiagnosedList;
