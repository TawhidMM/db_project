function removeFromArray(jsonArray, keysToRemove) {
    return jsonArray.map(obj => {
        keysToRemove.forEach(key => {
            delete obj[key]
        })
        return obj
    })
}

export default removeFromArray





