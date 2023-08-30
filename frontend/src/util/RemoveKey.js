function removeKey(jsnObject, keysToBeRemoved) {
    const updatedJsonObject = { ...jsnObject }

    keysToBeRemoved.forEach(key => {

        delete updatedJsonObject[key]
    })

    return updatedJsonObject
}

export default removeKey