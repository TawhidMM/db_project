import PropTypes from 'prop-types';
import {useEffect, useState} from "react";


function Select({name, options, form}) {

    const [selected, setSelected] = useState("")
    const [formData, setFormData] = form

   /* const handleChange = (event)=>{
        setSelected(event.target.value)

        setFormData({
            ...formData,
            [name]: selected,
        })

        console.log(selected)
        //console.log(formData)
    }*/

    useEffect(() => {
        if (selected) CallAPIWithSearchText(selected)
    }, [selected])

    function CallAPIWithSearchText (text) {
        setFormData({
            ...formData,
            [name]: selected
        })
    }

    return (
    <>
        <select className="form-select" aria-label="Default select example"
                defaultValue={options[0]}
                onChange={(event)=>
                    setSelected(event.target.value)}
        >
            {options.map((item, index) =>
                index === 0 ?
                    <option key={item} value={item} disabled hidden> {item} </option> :
                    <option key={item} value={item}> {item} </option>

            )}
        </select>
    </>
    )
}


Select.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
    form: PropTypes.array
}

export default Select