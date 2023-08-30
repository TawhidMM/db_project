// replace dash with space and capitalize 1st letter of
// every word
function formatString(inputString) {
    const words = inputString.split('_')

    const capitalizedWords = words.map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )

    return capitalizedWords.join(' ')
}

export default formatString