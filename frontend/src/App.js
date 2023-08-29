import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

// import pages
import Login from "./components/Login";
import PatientDashBoard from "./pages/PatientDashBoard";
import PatientSignUp from "./pages/patientSignUp";
import Home from "./pages/Home";
import PatientHeader from "./components/PatientHeader";

// import bootstrap css styles
import "bootstrap/dist/css/bootstrap.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path={"/patient/dashboard"} element={<PatientDashBoard />} />
            <Route path={"/patient/signup"} element={<PatientSignUp />} />
            <></>
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
