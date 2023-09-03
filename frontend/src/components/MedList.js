import React from "react"
import "../pages/AppointmentPrescription.css"

function MedList({ medicines }) {
    return (
        <>
            {medicines.map((med) => (
                <>
                    <div className="item">
                        <div className="name_type">
                            <h2>{med.MEDICINE_NAME}</h2>
                        </div>
                        <div className="weight_generic">
                            <p>{med.DOSAGE_AMOUNT}</p>
                        </div>
                        <div className="how_when">
                            <p>
                                Take <span>{med.DOSAGE_FREQUENCY}</span> for{" "}
                                <span>{med.DURATION} DAYS</span>
                            </p>
                            <span>{med.TIMING}</span>
                            <p>(Till: {med.TILL})</p>
                        </div>
                    </div>
                    <div className="devider"></div>
                </>
            ))}
        </>
    )
}

export default MedList
