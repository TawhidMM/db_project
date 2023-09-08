import React, {useEffect, useState} from "react"
import "../pages/AppointmentPrescription.css"
import {Link} from 'react-router-dom';

function TestList({ test, appointmentId }) {
    const [resultLink, setResultLink] = useState([])

    useEffect(() => {
        setResultLink(test.map(({TEST_NAME})=>{
            const encodedName = encodeURIComponent(TEST_NAME)

            return `/patient/history/test-result/?appointment_id=${appointmentId}&test_name=${encodedName}`
        }))
    }, [test])


    return (
        <>
            {test.map((ts, index) => (
                <li key={index}>
                    <Link to={resultLink[index]} >
                        {ts.TEST_NAME}
                    </Link>
                </li>
            ))}
        </>
    )

}

export default TestList
