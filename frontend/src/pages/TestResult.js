import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import TableHeaders from "../components/TableHeaders"
import removeKey from "../util/RemoveKey"
import axios from "axios"

export default function TestResult() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [testResult, setTestResult] = useState([{}])
    const [testDate, setTestDate] = useState("")
    const [medicalCenter, setMedicalCenter] = useState("")

    const appointmentId = searchParams.get("appointment_id")
    const testName = searchParams.get("test_name")

    const toBeTrimmed = ["TEST_DATE", "CENTER_NAME"]

    useEffect(() => {
        ;(async () => {
            const encodedAppId = encodeURIComponent(appointmentId)
            const encodedTestName = encodeURIComponent(testName)

            try {
                const response = await axios.get(
                    `/patient/history/test-result/?appointment_id=${encodedAppId}&test_name=${encodedTestName}`
                )
                setTestResult(response.data)

                console.log(response.data, "RESPONSE.DATA")
                setTestDate(response.data[0].TEST_DATE)
                setMedicalCenter(response.data[0].CENTER_NAME)
            } catch (error) {
                console.log("error getting test result")
                console.log(error)
            }
        })()
    }, [])

    return (
        <>
            <div className="row mt-4 mb-2">
                <p>Test Name : {testName}</p>
                <p>Performed date : {testDate}</p>
                <p>Performed on : {medicalCenter}</p>
            </div>
            <TableHeaders
                info={removeKey(testResult, toBeTrimmed)}
                links={[]}
                highlightedInfo={[]}
            />
        </>
    )
}
