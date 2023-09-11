import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AddTestResult(){
    const [allTests, setAllTests] = useState([{}])
    const [selectedTest, setSelectedTest] = useState('')
    const [appointmentId, setAppointmentId] = useState('')
    const [testParams, setTestParams] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async () =>{
            try {
                const testResponse = await axios.get(
                    `/hospital/upload-result/test-names/?app_id=${appointmentId}`)

                setAllTests(testResponse.data)

            } catch (error) {
                console.error('error in getting all test info', error)
            }
        })()
    }, [appointmentId])


    async function handleUploadResult() {
        try{
            console.log(selectedTest, appointmentId)
            const response = await axios.post
                                ('/hospital/upload-result', {selectedTest})


            const result = response.data.map(p =>({
                ...p,
                RESULT: '',
                REMARK: ''
            }))

            setTestParams(result)

            console.log(response.data, 'res')



        } catch (error) {

            console.log('error fetching test prams')
            console.log(error)
        }
    }

    function handleResultInput(event, index) {
        const {value, name} = event.target

        const updatedParams = [...testParams]
        updatedParams[index][name] = value

        setTestParams(updatedParams)

    }


    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const response = await axios.post
                ('/hospital/upload-result/submit', {appointmentId, selectedTest, testParams})

            navigate('../hospital/dashboard')
        } catch (error) {

            console.log('error submitting test result')
            console.log(error)
        }

        console.log(testParams, 'add click')
    }


    return(
        <form onSubmit={handleSubmit}>
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
                        input result
                    </button>
                </div>
            </div>

            <div className="container">
            {testParams.map((p, index) =>
                <div className='row align-items-center' key={p.PARAMETER_NAME}>
                    <div className='col-sm-2 mt-5'>
                        <p>{p.PARAMETER_NAME}</p>
                    </div>
                    <div className='col-sm-2 mt-5'>
                        <input className="form-control"
                               name="RESULT" type='text'
                               placeholder={'result value (' + (p.UNIT) + ')'}
                               onChange={(e) =>
                                   handleResultInput(e, index)}
                               required={true}
                        />
                    </div>
                    <div className='col-sm-2 mt-5'>
                        <input className="form-control" type='text'
                               name="REMARKS"
                               placeholder='remarks'
                               onChange={(e) =>
                                   handleResultInput(e, index)}
                        />
                    </div>
                </div>
            )}
            </div>
            {testParams.length !== 0 &&
            <div className="d-grid gap-2 col-2 mx-auto mt-3">
                <button className="btn btn-primary" type="submit">
                    submit
                </button>
            </div> }
        </form>
    )
}