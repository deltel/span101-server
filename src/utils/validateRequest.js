const validateRequest = (reqObj) => {
    const validArr = ['value', 'translation', 'part_of_speech', 'verb_type']
    const arr = validArr.map((element) => {
        if (reqObj[element] === '' || reqObj[element] === undefined) return false
        return true
    })
    if (arr.includes(false)) throw new Error('Invalid form')
}

module.exports = validateRequest