import PropTypes from "prop-types";
import {useEffect, useState} from "react";



function PasswordInput({name ,placeholder, form, changeAlert, required}) {
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

    return(
        <div className="form-floating">
            <input
                type="password" className="form-control"
                id={name} placeholder={placeholder}
                required={required}
                onChange={(event)=> {
                        setValue(event.target.value)
                        changeAlert(true)
                    }
                }
            />
            <label htmlFor="floatingPassword">{placeholder}</label>
        </div>
    )
}

PasswordInput.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    form: PropTypes.array
}
export default PasswordInput