import formatString from "../util/StringFormat";
import React from "react";
import {hasFormSubmit} from "@testing-library/user-event/dist/utils";
import Select from "./Select";

function InputCard({infoState}) {
    const [patientInfo, setInfo] = infoState

    const { FIRST_NAME, LAST_NAME, EMAIL, STREET_ADDRESS,
        CITY, POSTAL_CODE, SUB_DISTRICT, DISTRICT }
            = patientInfo

    const genderOptions = ['Female', 'Male']
    const bloodGroups = ["Blood Group", "A+", "A-", "B+", "B-", "AB+",
        "AB-", "O+", "O-",]

    const updateInfo = (event, key) => {
        setInfo({
            ...patientInfo,
            [key]: event.target.value
        })
    }

    const KeyValueRow = ({keyName, value}) => {

        return (
            <>
                <div className="row">
                    <div className="col-sm-5">
                        <p className="mb-0">{formatString(keyName)}</p>
                    </div>
                    <div className="col-sm-1">
                        <input className="text-muted mb-7" value={value}
                                onChange={event=>updateInfo(event,keyName)}
                        />
                    </div>
                </div>
                <hr/>
            </>
        )
    }

    return (
        /*<div className="card mb-3 col-lg-5 mx-auto mt-3">
            <div className="card-body">
                {Object.keys(patientInfo).map((key) => (
                    <KeyValueRow key={key} keyName={key} value={patientInfo[key]} />
                ))}
            </div>
        </div>*/



    <div className="card mb-3 col-lg-5 mx-auto mt-3">
        <div className="card-body">
            <div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">FIRST NAME</p>
                </div>
                <div className="col-sm-1">
                    <input className="text-muted mb-7" value={FIRST_NAME}
                           name='FIRST_NAME'
                           onChange={event => updateInfo(event,event.target.name)}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">FIRST NAME</p>
                </div>
                <div className="col-sm-1">
                    <input className="text-muted mb-7" value={LAST_NAME}
                           name='LAST_NAME'
                           onChange={event => updateInfo(event,event.target.name)}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">EMAIL</p>
                </div>
                <div className="col-sm-1">
                    <input className="text-muted mb-7" value={EMAIL}
                           name='EMAIL'
                           onChange={event => updateInfo(event,event.target.name)}
                    />
                </div>
            </div>
            <hr/>
            {/*<div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">GENDER</p>
                </div>
                <div className="col-sm-1">
                    <select className="form-select" aria-label="Default select example"
                            defaultValue={GENDER}
                            onChange={(event)=>
                                updateInfo(event,event.target.value)}
                    >
                        {genderOptions.map((item, index) =>
                                <option key={item} value={item}> {item} </option>
                        )}
                    </select>
                </div>
            </div>
            <hr/>*/}
            {/*<div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">BLOOD GROUP</p>
                </div>
                <div className="col-sm-1">
                    <select className="form-select" aria-label="Default select example"
                            defaultValue={}
                            onChange={(event)=>
                                updateInfo(event,event.target.value)}
                    >
                        {genderOptions.map((item, index) =>
                            <option key={item} value={item}> {item} </option>
                        )}
                    </select>
                </div>
            </div>
            <hr/>*/}
            <div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">STREET ADDRESS</p>
                </div>
                <div className="col-sm-1">
                    <input className="text-muted mb-7" value={STREET_ADDRESS}
                           name='STREET_ADDRESS'
                           onChange={event => updateInfo(event,event.target.name)}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">CITY</p>
                </div>
                <div className="col-sm-1">
                    <input className="text-muted mb-7" value={CITY}
                           name='CITY'
                           onChange={event => updateInfo(event,event.target.name)}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">POST CODE</p>
                </div>
                <div className="col-sm-1">
                    <input className="text-muted mb-7" value={POSTAL_CODE}
                           name='POSTAL_CODE'
                           onChange={event => updateInfo(event,event.target.name)}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">SUB DISTRICT</p>
                </div>
                <div className="col-sm-1">
                    <input className="text-muted mb-7" value={SUB_DISTRICT}
                           name='SUB_DISTRICT'
                           onChange={event => updateInfo(event,event.target.name)}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-sm-5">
                    <p className="mb-0">DISTRICT</p>
                </div>
                <div className="col-sm-1">
                    <input className="text-muted mb-7" value={DISTRICT}
                           name='DISTRICT'
                           onChange={event => updateInfo(event,event.target.name)}
                    />
                </div>
            </div>
            <hr/>
        </div>
    </div>

    )
}

export default InputCard