import axios from "axios"
import { useEffect, useState } from "react"
import InputCard from "../components/InputCard"
import { useNavigate } from "react-router-dom"

function EditPatientProfile() {
    const [passChange, setPassChange] = useState(false)
    const [pass, setPass] = useState({
        password: "",
        confirmedPassword: "",
    })
    const [passwordMatch, setPasswordMatch] = useState(true)

    const patientInfoState = useState({})
    const [patient, setPatient] = patientInfoState

    const navigate = useNavigate()

    useEffect(() => {
        const getPatient = async () => {
            try {
                const response = await axios.get("/patient/edit-profile")
                setPatient(response.data[0])

                console.log(patient)
            } catch (error) {
                console.error("Error fetching patient information ")
                console.log(error)
            }
        }

        ;(async () => {
            await getPatient()
        })()
    }, [])

    function handlePassChangeBox() {
        setPassChange(true)
    }
    function handlePassChange(event) {
        setPass({
            ...pass,
            [event.target.name]: event.target.value,
        })

        setPasswordMatch(true)
    }

    async function handleUpdate() {
        console.log(patient)

        if (pass.password !== pass.confirmedPassword) {
            setPasswordMatch(false)

            return
        }

        patient.PASSWORD = pass.password

        const response = await axios.post(
            "/patient/edit-profile/save-changes",
            patient
        )

        if (response.status === 200) {
            navigate("../patient/dashboard")
            console.log(response.data)
        }
    }

    return (
        <>
            <InputCard infoState={patientInfoState} />
            <div className="d-grid gap-2 col-2 mx-auto mt-3">
                <button
                    type="button mx-auto mt-3"
                    className="btn btn-primary"
                    onClick={handlePassChangeBox}
                >
                    Change Password
                </button>
            </div>
            {passChange && (
                <div className="card mb-3 col-lg-5 mx-auto mt-3">
                    <input
                        type="password"
                        name="password"
                        placeholder="new password"
                        onChange={handlePassChange}
                    />
                    <input
                        type="password"
                        name="confirmedPassword"
                        placeholder="confirm password"
                        onChange={handlePassChange}
                    />
                </div>
            )}
            {!passwordMatch && (
                <div className="alert alert-danger mx-auto col-3" role="alert">
                    please enter the same password
                </div>
            )}
            <div className="d-grid gap-2 col-2 mx-auto mt-3">
                <button
                    type="button mx-auto mt-3"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </div>
        </>
    )
}

export default EditPatientProfile
