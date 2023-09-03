import React, {useEffect, useState} from 'react';
import MedicineInput from "../components/MedicineInput";
import DynamicInput from "../components/DynamicInput";
import axios from "axios";

function MedicineForm() {
    const [medicines, setMedicines] = useState([
        { name: '', dose: '', frequency: '',duration:'', timing:''}])
    const [diseases, setDiseases] = useState([''])
    const [tests, setTests] = useState([''])
    const [condition, setCondition] = useState(
        {bloodPressure: '', heartRate: '', weight: '', height: '', symptoms: ''})

    const [medDbInfo, setMedDbInfo] = useState(
        {allMeds:[], allDiseases:[], allTests:[]})


    useEffect(() => {
        (async () =>{
            try {
                const medResponse = await axios.get('/info/all-medicines')
                const disResponse = await axios.get('/info/all-diseases')
                const testResponse = await axios.get('/info/all-tests')

                setMedDbInfo( ({
                    ...medDbInfo,
                    ['allMeds']: medResponse.data,
                    ['allDiseases']: disResponse.data,
                    ['allTests']: testResponse.data
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

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Medicine Info:', medicines)
        console.log('Medicine Info:', diseases)
        console.log('Medicine Info:', tests)
        console.log('Medicine Info:', condition)
    }

    return (
        <div>
            <h2>Prescription</h2>
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-end">
                    <div className="col-2">
                        <input
                            type="text"
                            className="form-control"
                            value={currDate}
                            disabled
                        />
                    </div>
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

