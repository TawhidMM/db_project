import { useState } from "react"

import InputField from "../components/InputField"
import Select from "../components/Select"
import PasswordInput from "../components/PasswordInput"

import patientInitialValues from "../data/PatientInitialVals"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function PatientSignUp() {
    const form = useState(patientInitialValues)
    const [formInput, setFormInput] = form
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [signUpFailed, setSignUpFailed] = useState(false)
    const [signUpAlertMsg, setSignUpAlertMsg] = useState("")
    const navigate = useNavigate()

    const genders = ["Gender", "Female", "Male"]
    const bloodGroups = [
        "Blood Group",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
    ]

    const handleSignInClick = async () => {
        const { password, confirmPassword } = formInput
        setSignUpFailed(false)

        console.log(formInput)

        if (password !== confirmPassword) {
            setPasswordMatch(false)

            return
        }

        try {
            const response = await axios.post("/patient/s", formInput)
            console.log(response.data)
        } catch (error) {
            if (error.response.status === 436) {
                const { message } = error.response.data
                console.log(message)
                console.log(error.response.data)
                setSignUpFailed(true)
                setSignUpAlertMsg(message)
            } else {
                console.log("signup failed")
                console.log(error)
            }
        }
    }

    const handleLoginClick = () => {
        navigate(`../patient/login`)
    }

    return (
        <>
            <div className="header">
                <center>
                    <br />
                    <h1>Medical portal for Patients</h1>
                    <h2>Signup</h2>
                    <br />
                    <br />
                </center>
            </div>
            <div className="row my-3">
                <div className="col">
                    <InputField
                        name={"nid"}
                        placeholder={"NID number"}
                        form={form}
                    />
                </div>
            </div>
            <div className="row my-3">
                <div className="col">
                    <InputField
                        name={"firstName"}
                        placeholder={"First name"}
                        form={form}
                    />
                </div>
                <div className="col">
                    <InputField
                        name={"lastName"}
                        placeholder={"Last name"}
                        form={form}
                    />
                </div>
            </div>
            <div className="row my-3">
                <InputField
                    name={"email"}
                    placeholder={"email address"}
                    form={form}
                />
            </div>
            <div className="row my-3">
                <div className="col">
                    <Select
                        name={"bloodGroup"}
                        defaultItem={"Blood Group"}
                        options={bloodGroups}
                        form={form}
                    />
                </div>
                <div className="col">
                    <Select
                        name={"gender"}
                        defaultItem={"Gender"}
                        options={genders}
                        form={form}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Date of Birth"
                        id="DOB"
                        onFocus={(event) => (event.target.type = "date")}
                        onBlur={(event) => (event.target.type = "text")}
                        onChange={(event) => {
                            setFormInput({
                                ...formInput,
                                ["dob"]: event.target.value,
                            })
                        }}
                    />
                </div>
            </div>
            <div className="row my-3">
                <div className="col">
                    <InputField
                        name={"imageUrl"}
                        placeholder={"Image url"}
                        form={form}
                    />
                </div>
            </div>
            <div className="row my-3">
                <div className="col">
                    <InputField
                        name={"street"}
                        placeholder={"Street"}
                        form={form}
                    />
                </div>
                <div className="col">
                    <InputField
                        name={"city"}
                        placeholder={"City"}
                        form={form}
                    />
                </div>
                <div className="col">
                    <InputField
                        name={"postalCode"}
                        placeholder={"Postal Code"}
                        form={form}
                    />
                </div>
            </div>
            <div className="row my-3">
                <div className="col">
                    <InputField
                        name={"subDistrict"}
                        placeholder={"Sub District"}
                        form={form}
                    />
                </div>
                <div className="col">
                    <InputField
                        name={"district"}
                        placeholder={"District"}
                        form={form}
                    />
                </div>
            </div>
            <div className="row my-3">
                <div className="col">
                    <PasswordInput
                        name={"password"}
                        placeholder={"Password"}
                        form={form}
                        changeAlert={setPasswordMatch}
                    />
                </div>
                <div className="col">
                    <PasswordInput
                        name={"confirmPassword"}
                        placeholder={"Confirm Password"}
                        form={form}
                        changeAlert={setPasswordMatch}
                    />
                </div>
            </div>
            {!passwordMatch && (
                <div className="alert alert-danger mx-auto col-3" role="alert">
                    please enter the same password
                </div>
            )}
            {signUpFailed && (
                <div className="alert alert-danger mx-auto col-3" role="alert">
                    {signUpAlertMsg}
                </div>
            )}
            <div className="d-grid gap-2 col-2 mx-auto mt-3">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSignInClick}
                >
                    Sign up
                </button>
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={handleLoginClick}
                >
                    Log in
                </button>
            </div>
        </>
    )
}

export default PatientSignUp
