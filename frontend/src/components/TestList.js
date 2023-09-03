import React from "react"
import "../pages/AppointmentPrescription.css"

function TestList({ test }) {
    return (
        <>
            {test.map((ts) => (
                <li>{ts.TEST_NAME}</li>
            ))}
        </>
    )
}

export default TestList
