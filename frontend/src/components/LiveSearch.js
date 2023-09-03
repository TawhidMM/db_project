import React from "react";

function LiveSearch({options}) {


    return (
        <>
            <input className="form-control" list="List"/>
            <datalist id="List">
                {options.map(value=>
                    <option key={value} value={value}/> )}
            </datalist>
        </>
    )

}


export default LiveSearch;