import PropTypes from 'prop-types';
import {useEffect, useState} from "react";


function InputField({name ,placeholder, form}){
    const [value, setValue] = useState("")
    const [formData, setFormData] = form


    useEffect(() => {
        if (value) CallAPIWithSearchText(value)
    }, [value]);

    function CallAPIWithSearchText (text) {
        setFormData({
            ...formData,
            [name]: value
        })
    }


    return (
    <>
        <div className="input-group mb-3">
            <div className="form-floating">
                <input
                    type="text" className="form-control" id={name}
                    placeholder={placeholder}
                    onChange={(event)=>
                        setValue(event.target.value)}
                />
                <label htmlFor="floatingInput">{placeholder}</label>
            </div>
        </div>
    </>
    )
}

InputField.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    form: PropTypes.array
}

export default InputField