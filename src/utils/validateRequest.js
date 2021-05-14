const validArr = ['value', 'translation', 'part_of_speech', 'category']

const validateRequest = (reqObj) => {
    const arr = validArr.map((element) => {
        if (reqObj[element] === '' || reqObj[element] === undefined) return false
        return true
    })
    if (arr.includes(false)) throw new Error('Invalid form')
}

module.exports = {
    validateRequest,
    validArr
}