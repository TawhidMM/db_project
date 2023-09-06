import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom"

// import pages
import Login from "./pages/Login"
import PatientDashBoard from "./pages/PatientDashBoard"
import PatientSignUp from "./pages/patientSignUp"
import Home from "./pages/Home"
import AppointmentPrescription from "./pages/AppointmentPrescription"
import PatientHeader from "./components/PatientHeader"
import DoctorDashboard from "./pages/DoctorDashboard"
import HospitalDashboard from "./pages/HospitalDashboard"

// import bootstrap css styles
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import PatientHistory from "./pages/PatientHistory"
import EditPatientProfile from "./pages/EditPatientProfile"
import AddPrescription from "./pages/AddPrescription"
import LiveSearch from "./components/LiveSearch"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home />} />
            <Route path="/patient/login" element={<Login user="patient" />} />
            <Route path={"/patient/dashboard"} element={<PatientDashBoard />} />
            <Route path={"/patient/history"} element={<PatientHistory />} />
            <Route
                path={"/patient/history/Appointment"}
                element={<AppointmentPrescription />}
            />
            <Route path={"/patient/signup"} element={<PatientSignUp />} />
            <Route
                path={"/patient/edit-profile"}
                element={<EditPatientProfile />}
            />
            <Route path={"/add-med"} element={<AddPrescription />} />
            <Route
                path={"/demo"}
                element={<LiveSearch options={["a", "b", "c"]} />}
            />

            <Route path="/doctor/login" element={<Login user="doctor" />} />
            <Route path={"/doctor/dashboard"} element={<DoctorDashboard />} />

            <Route path="/hospital/login" element={<Login user="hospital" />} />
            <Route
                path={"/hospital/dashboard"}
                element={<HospitalDashboard />}
            />
        </Route>
    )
)

function App() {
    return <RouterProvider router={router} />
}

export default App
