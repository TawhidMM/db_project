function removeFromArray(jsonArray, keysToRemove) {

    return jsonArray.map(obj => {
        const copyObj = {...obj}

        keysToRemove.forEach(key => {
            delete copyObj[key]
        })
        return copyObj
    })
}

export default removeFromArray





