window.onload = async () => {

    const valueField = document.querySelector('#value')
    const translationField = document.querySelector('#translation')
    const categoryField = document.querySelector('#category')
    const keywordField = document.querySelector('#keyword')
    const partOfSpeechField = document.querySelector('#partOfSpeech')
    const exampleField = document.querySelector('#example')
    const form = document.querySelector('form')
    const feedbackDiv = document.querySelector('.feedback')

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = {
            value: valueField.value,
            translation: translationField.value,
            part_of_speech: partOfSpeechField.value,
            category: categoryField.value,
            keyword: keywordField.value,
            example: exampleField.value
        }
        
        const response = await fetch('/words', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseJson = await response.json()

        if (response.status !== 201) {
            feedbackDiv.textContent = responseJson.error
            feedbackDiv.classList.toggle('danger')
            setTimeout(() => {
                feedbackDiv.textContent = undefined
                feedbackDiv.classList.toggle('danger')
            }, 2000)
            return
        }

        valueField.value = ''
        translationField.value = ''
        partOfSpeechField.value = ''
        categoryField.value = ''
        keywordField.value = ''
        exampleField.value = ''

        feedbackDiv.textContent = 'Successfully added'
        feedbackDiv.classList.toggle('success')
        setTimeout(() => {
            feedbackDiv.textContent = undefined
            feedbackDiv.classList.toggle('success')
        }, 2000)
    }

    form.onsubmit = submitHandler
}