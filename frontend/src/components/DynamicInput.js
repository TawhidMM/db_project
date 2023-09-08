import React, {useEffect, useMemo, useState} from "react"


function DynamicInput({elements, setElement, options}) {
    const [listName, setListName] = useState('')

    useMemo(() => {
        if(options.length !== 0) {
            setListName(Object.keys(options[0])[0])
        }

    }, [options])


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
                    <div className="col-sm-6">
                        <input className="form-control" list={listName}
                               onChange={(e) =>
                                   handleChange(e, index)}
                        />
                        <datalist id={listName}>
                            {options.map((value) =>
                                <option key={value[listName]} value={value[listName]}/> )}
                        </datalist>
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