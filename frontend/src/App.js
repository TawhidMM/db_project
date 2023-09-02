import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

// import pages
import Login from "./pages/Login";
import PatientDashBoard from "./pages/PatientDashBoard";
import PatientSignUp from "./pages/patientSignUp";
import Home from "./pages/Home";
import EditPatientProfile from './pages/EditPatientProfile'
import AddPrescription from "./pages/AddPrescription"
import Demo from "./components/Demo"

// import bootstrap css styles
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>} />
            <Route path="/patient/login" element={<Login user='patient'/>} />
            <Route path="/doctor/login" element={<Login user='doctor'/>} />
            <Route path={"/patient/dashboard"} element={<PatientDashBoard/>} />
            <Route path={"/patient/signup"} element={<PatientSignUp />} />
            <Route path={'/patient/edit-profile'} element={<EditPatientProfile/>} />
            <Route path={'/add-med'} element={<AddPrescription/>} />
            <Route path={"/demo"} element={<Demo />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
