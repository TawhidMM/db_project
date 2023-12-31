import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import HomeHeader from "../components/HomeHeader"

function Login({ user }) {
    console.log(user) //[][][][

    const [nid, setNid] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(true)
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        console.log("Username:", nid)
        console.log("Password:", password)

        setSuccess(true)

        event.preventDefault()

        try {
            const response = await axios.post(`/${user}/login`, {
                nid,
                password,
            })

            if (response.status === 200) {
                navigate(`../${user}/dashboard`)
            } else if (response.status === 404) {
                console.log("invalid id/password")
                setSuccess(false)
            }
        } catch (error) {
            console.error("Login failed:", error)
            setSuccess(false)
        }
    }
    const handleSignupClick = () => {
        navigate(`../patient/signup`)
    }

    return (
        <>
            <HomeHeader />
            <div className="header">
                <center>
                    <br />
                    <h1>Medical portal for {user}</h1>
                    <h2>Login</h2>
                    <br />
                    <br />
                </center>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="NID Number"
                    onChange={(event) => setNid(event.target.value)}
                />
                <label htmlFor="floatingInput">NID Number</label>
            </div>
            <div className="form-floating">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="d-grid gap-2 col-3 mx-auto my-4">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleLogin}
                >
                    Log in
                </button>
                {user === "patient" && (
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={handleSignupClick}
                    >
                        Sign up
                    </button>
                )}
            </div>

            {!success && (
                <div className="alert alert-danger mx-auto col-3" role="alert">
                    Wrong Credentials
                </div>
            )}
        </>
    )
}

export default Login
