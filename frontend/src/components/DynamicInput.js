import React from "react";

function DynamicInput({elements, setElement, allOptions}) {

    const handleChange = (e, index) => {
        const {value} = e.target
        const updatedElements = [...elements]
        updatedElements[index] = value
        setElement(updatedElements)
    }


    const handleAddElement = () => {
        setElement([...elements, ''])
    }

    return (
        <>
            {elements.map((medicine, index) => (
                <div key={index} className="row mb-1" >
                    <div className="col-sm-4">
                        {/*<input
                            className="form-control"
                            onChange={(e) =>
                                handleChange(e, index)}
                        />*/}



                    </div>
                </div>
            ))}
            <button type="button" className="btn btn-outline-warning" onClick={handleAddElement}>
                Add
            </button>
        </>
    )
}

export default DynamicInput