import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function MyModal({appointment, rowNum}) {
    const[appBookInfo, setAppBookInfo] = useState(appointment)
    const navigate = useNavigate()


    async function handleConfirm() {
        try {
            const response = await axios.post('/patient/find/book-appointment', appBookInfo)

            if(response.status === 200)
                navigate('../patient/dashboard')

        } catch (error) {
            console.log('error booking appointment')
            console.log(error)
        }
    }

    return(
        <>
            <button type="button" className="btn btn-outline-dark"
                    data-bs-toggle="modal"
                    data-bs-target={`#${rowNum}`}
            >
                book appointment
            </button>

            <div className="modal fade" id={rowNum} data-bs-backdrop="static"
                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                 aria-hidden="false"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Book Appointment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Doctor Name : {appBookInfo.NAME} </p>
                            <p>Hospital :  {appBookInfo.MED_CENTER} </p>
                            <h6> Fix appointment date </h6>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Appointment Date"
                                id="DOB"
                                onFocus={(event) => (event.target.type = "date")}
                                onBlur={(event) => (event.target.type = "text")}
                                onChange={(event) => {
                                    setAppBookInfo({
                                        ...appBookInfo,
                                        DATE: event.target.value
                                    })
                                    console.log(appBookInfo)
                                }}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={handleConfirm}
                            >
                                confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}