import { useState } from "react";
import InputField from "../components/InputField";
import Select from "../components/Select";
import PasswordInput from "../components/PasswordInput";

import patientInitialValues from "../data/PatientInitialVals";
import { useNavigate } from "react-router-dom";

function PatientSignUp() {
    const form = useState(patientInitialValues);
    const navigate = useNavigate();

    const genders = ["Gender", "Female", "Male"];
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
    ];

    const handleSignInClick = () => {
        const [formInput, setFormInput] = form;

        console.log(formInput);
    };

    const handleLoginClick = () => {
        navigate(`../login`);
    };

    return (
        <>
            <div class="header">
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
                    {/*
                    date picker
                */}
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
                    />
                </div>
                <div className="col">
                    <PasswordInput
                        name={"confirmPassword"}
                        placeholder={"Confirm Password"}
                        form={form}
                    />
                </div>
            </div>
            <div className="d-grid gap-2 col-2 mx-auto">
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
    );
}

export default PatientSignUp;
