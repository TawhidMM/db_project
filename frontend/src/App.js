import {
    createBrowserRouter,
    createRoutesFromElements,
    Route, RouterProvider
} from 'react-router-dom'

// import pages
import Login from "./components/Login"
import PatientDashBoard from "./components/PatientDashBoard"
import PatientSignUp from "./pages/patientSignUp";

// import bootstrap css styles
import 'bootstrap/dist/css/bootstrap.css'



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/login' element={<Login/>} />
            <Route path={'/id/:patientId/name/:patientName'} element={<PatientDashBoard/>}/>
            <Route path={'/patient/signup'} element={<PatientSignUp/>}/>
        </Route>
    )
)


function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
