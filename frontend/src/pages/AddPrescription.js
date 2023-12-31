import React, {useEffect, useState} from 'react';
import MedicineInput from "../components/MedicineInput";
import DynamicInput from "../components/DynamicInput";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";

function MedicineForm() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [medicines, setMedicines] = useState([
        { name: '', dose: '', frequency: '',duration:'', timing:''}])
    const [diseases, setDiseases] = useState([''])
    const [tests, setTests] = useState([''])
    const [condition, setCondition] = useState(
        {bloodPressure: '', heartRate: '', weight: '', height: '', symptoms: '', medicalCenter: ''})

    const [selectedHospital, setSelectedHospital] = useState('')
    const [medDbInfo, setMedDbInfo] = useState(
        {allMeds:[], allDiseases:[], allTests:[], allMedCenters:[]})

    const patientId = searchParams.get('patient_id')
    const patientName = searchParams.get('patient_name')

    const navigate= useNavigate()


    useEffect(() => {
        (async () =>{
            try {
                const medResponse = await axios.get('/info/all-medicines')
                const disResponse = await axios.get('/info/all-diseases')
                const testResponse = await axios.get('/info/all-tests')
                const medCenterResponse = await axios.get('/info/all-med-centers')

                setMedDbInfo( ({
                    ...medDbInfo,
                    ['allMeds']: medResponse.data,
                    ['allDiseases']: disResponse.data,
                    ['allTests']: testResponse.data,
                    ['allMedCenters']: medCenterResponse.data
                }))

                console.log(medDbInfo)

            } catch (error) {
                console.error('error in getting all med info', error)
            }
        })()
    }, [])

    const handleConditionChange = (event)=>{
        const {name, value} = event.target
        setCondition({
            ...condition,
            [name]: value
        })
    }



    const currDate = new Date().toLocaleDateString()

    const handleSubmit = async (event) => {
        event.preventDefault()

        condition.patientId = patientId
        condition.date = currDate
        condition.dateFormat = 'MM/DD/YYYY'

        console.log('Medicine Info:', medicines)
        console.log('diseases Info:', diseases)
        console.log('test Info:', tests)
        console.log('condition Info:', condition)

        try {
            const response = await axios.post(`/doctor/add-prescription`,
                {condition, medicines, tests, diseases});

            if (response.status === 200) {
                console.log('successfully added')

                navigate('../doctor/upcoming')
            }

        } catch (error) {
            console.error("upload failed:", error)
        }
    }

    return (
        <div>
            <div className="d-grid gap-2 col-2 mx-auto mt-3">
                <h2>Prescription</h2>
            </div>
            <div className='mt-lg-4 mb-3'>
                <h5>Name : {patientName}</h5>
                <h5>ID : {patientId}</h5>
            </div>
            <form onSubmit={handleSubmit}>
                    <div className="row mb-lg-5 mt-lg-5" >
                        <div className="col-sm-4">
                            <input className="form-control" list="medCenters"
                                   name="medicalCenter"
                                   placeholder="Medical Center"
                                   required={true}
                                   onChange={handleConditionChange}
                            />
                            <datalist id="medCenters">
                                {medDbInfo.allMedCenters.map(({NAME}) =>
                                    <option key={NAME} value={NAME}/> )}
                            </datalist>
                        </div>
                        <div className="col-2"/>
                        <div className="col-2"/>
                        <div className="col-2">
                            <input
                                type="text"
                                className="form-control"
                                value={'Date: ' + currDate}
                                disabled
                            />
                        </div>
                    </div>
                <div className="row justify-content-end">

                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <lebel> Blood Pressure</lebel>
                        <input
                            type="text"
                            className="form-control"
                            name="bloodPressure"
                            placeholder="(  /  ) mmHg"
                            onChange={handleConditionChange}
                        />
                    </div>
                    <div className="col-sm-2">
                        <lebel> Heart Rate</lebel>
                        <input
                            type="text"
                            className="form-control"
                            name="heartRate"
                            placeholder=" beats/minute"
                            onChange={handleConditionChange}
                        />
                    </div>
                    <div className="col-sm-2">
                        <lebel>Weight</lebel>
                        <input
                            type="text"
                            className="form-control"
                            name="weight"
                            placeholder="kg"
                            onChange={handleConditionChange}
                        />
                    </div>
                    <div className="col-sm-2">
                        <lebel>Height</lebel>
                        <input
                            type="text"
                            className="form-control"
                            name="height"
                            placeholder="cm"
                            onChange={handleConditionChange}
                        />
                    </div>
                </div>
                <br/>
                <div>
                    <lebel>Symptoms</lebel>
                    <input
                        type="text"
                        className="form-control"
                        name="symptoms"
                        placeholder="symptoms"
                        onChange={handleConditionChange}
                    />
                </div>

                <br/>
                <br/>
                <MedicineInput
                    medicines={medicines}
                    setMedicines={setMedicines}
                    options={medDbInfo.allMeds}
                />
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col">
                        <lebel>Diseases</lebel>
                        <DynamicInput
                            elements={diseases}
                            setElement={setDiseases}
                            options={medDbInfo.allDiseases}
                        />
                    </div>
                    <div className="col">
                        <lebel>Test</lebel>
                        <DynamicInput elements={tests} setElement={setTests}
                                      options={medDbInfo.allTests}
                        />
                    </div>
                </div>
                <br/>
                <br/>
                <div className="d-grid gap-2 col-2 mx-auto mt-3">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default MedicineForm;

