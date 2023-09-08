import React, {useEffect, useState} from "react";
import axios from "axios";

export default function AddTestResult(){
    const [allTests, setAllTests] = useState([{}])
    const [selectedTest, setSelectedTest] = useState('')
    const [appointmentId, setAppointmentId] = useState('')

    useEffect(() => {
        (async () =>{
            try {
                const testResponse = await axios.get('/info/all-tests')

                setAllTests(testResponse.data)

            } catch (error) {
                console.error('error in getting all test info', error)
            }
        })()
    }, [])


    function handleUploadResult() {


    }

    return(
        <>
            <div className='row'>
                <div className='col-sm-4 mt-5'>
                    <input className="form-control"
                           placeholder='Appointment Id'
                           onChange={(e) =>
                               setAppointmentId(e.target.value)}
                           required={true}
                    />
                </div>
                <div className="col-sm-4 mt-5">
                    <input className="form-control" list="tests"
                           placeholder='Select test name'
                           onChange={(e) =>
                               setSelectedTest(e.target.value)}
                           required={true}
                    />
                    <datalist id="tests">
                        {allTests.map(({TEST_NAME}) =>
                            <option key={TEST_NAME} value={TEST_NAME}/> )}
                    </datalist>
                </div>
                <div className="col-sm-4 mt-5">
                    <button type="button" className="btn btn-outline-warning"
                            onClick={handleUploadResult}
                    >
                        upload result
                    </button>
                </div>
            </div>
        </>
    )
}