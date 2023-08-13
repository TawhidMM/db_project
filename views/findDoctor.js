const specialistInput = document.getElementById("specialist")
const locationInput = document.getElementById("location")
const button = document.getElementById("searchButton")

console.log(button)

button.addEventListener("click", ()=>{
    console.log('clicked')
})

async function searchDoctor(){
    console.log("button clicked")

    const specialist = specialistInput.value
    const location = locationInput.value

    const response = await fetch(`/find-doctor/${specialist}&${location}`)
    const foundDoctors = await response.json()

    console.log(foundDoctors)
}

// Immunologist
// Downtown