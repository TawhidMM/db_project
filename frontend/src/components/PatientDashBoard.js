import { useParams } from "react-router-dom";


function PatientDashBoard() {
    const {patientId, patientName} = useParams()

    return (
        <div>welcome {patientId} {patientName}</div>
    )
}




export default PatientDashBoard