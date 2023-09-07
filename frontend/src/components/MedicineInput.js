import React, {useEffect} from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";

function MedicineInput({medicines, setMedicines, options}) {

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const updatedMedicines = [...medicines]

        updatedMedicines[index][name] = value
        setMedicines(updatedMedicines)
    }

    const handleAddMedicine = () => {
        setMedicines([...medicines, { name: '', dose: '', frequency: '', duration: '', timing: '' }])
    }

    return(
        <>
            <div className="row mb-3" >
                <div className="col-sm-2">
                    <label>Medicine Name</label>
                </div>
                <div className="col-sm-2">
                    <label>Dose</label>
                </div>
                <div className="col-sm-2">
                    <label>Frequency</label>
                </div>
                <div className="col-sm-2">
                    <label>Duration</label>
                </div>
                <div className="col-sm-2">
                    <label>Timing</label>
                </div>
            </div>
            {medicines.map((medicine, index) => (
                <div key={index} className="row mb-3" >
                    <div className="col-sm-2">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={medicine.name}
                            list="medList"
                            onChange={(e) => handleChange(e, index)}
                        />
                        <datalist id="medList">
                            {options.map(({NAME})=>
                                <option key={NAME} value={NAME}/> )}
                        </datalist>
                    </div>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="text"
                            name="dose"
                            value={medicine.dose}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </div>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="text"
                            name="frequency"
                            value={medicine.frequency}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </div>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="text"
                            name="duration"
                            value={medicine.duration}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </div>

                    <div className="col-sm-2">
                        <select className="form-select " aria-label="Default select example"
                                name="timing"
                                onChange={(e) => handleChange(e, index)}
                        >
                            <option value="set timing" selected hidden disabled>set timing</option>
                            <option value="before meal">before meal</option>
                            <option value="after meal">after meal</option>
                        </select>
                    </div>
                </div>
            ))}
            <button type="button" className="btn btn-outline-info" onClick={handleAddMedicine}>
                Add Medicine
            </button>

        </>
    )
}


export default MedicineInput