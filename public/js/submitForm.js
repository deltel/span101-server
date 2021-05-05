window.onload = async () => {

    const valueField = document.querySelector('#value')
    const translationField = document.querySelector('#translation')
    const verbTypeField = document.querySelector('#verb-type')
    const keywordField = document.querySelector('#keyword')
    const partOfSpeechField = document.querySelector('#partOfSpeech')
    const exampleField = document.querySelector('#example')
    const form = document.querySelector('form')

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = {
            value: valueField.value,
            translation: translationField.value,
            part_of_speech: partOfSpeechField.value,
            verb_type: verbTypeField.value,
            keyword: keywordField.value,
            example: exampleField.value
        }

        try {
            await fetch('/words', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            valueField.value = ''
            translationField.value = ''
            partOfSpeechField.value = ''
            verbTypeField.value = ''
            keywordField.value = ''
            exampleField.value = ''
        } catch (e) {

        }
    }

    form.onsubmit = submitHandler
}