window.onload = async () => {
    // searching
    const searchBox = document.querySelector('input')
    const form = document.querySelector('.search form')
    const feedbackDiv = document.querySelector('.feedback')


    const searchHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/words/?search=${searchBox.value}`)

            const responseJson = await response.json()

            window.location.assign(`/${responseJson[0].id}`)
        } catch (e) {
            if (e.message.includes('Cannot read property \'id\' of undefined')) {
                feedbackDiv.textContent = 'Word not found'
                feedbackDiv.classList.toggle('danger')
                
                setTimeout(() => {
                    feedbackDiv.textContent = undefined
                    feedbackDiv.classList.toggle('danger')
                }, 2000)
            }
        }
    }

    form.onsubmit = searchHandler

    // loading data
    const listBody = document.querySelector('.list')
    const leftArrow = document.querySelector('.left')
    const rightArrow = document.querySelector('.right')
    let offset = 0

    const getData = async () => {
        const response = await fetch('/words?offset=' + offset)
        const data = await response.json()

        listBody.innerHTML = null

        data.forEach((word) => {
            const listItem = document.createElement('li')
            const link = document.createElement('a')
            link.href = `/${word.id}`
            const card = document.createElement('div')

            card.className = 'card'
            card.textContent = word.value
            link.appendChild(card)
            listItem.appendChild(link)
            listBody.appendChild(listItem)
        })

    }

    leftArrow.addEventListener('click', () => {
        if (offset === 0) return
        offset = offset - 20
        getData()
    })

    rightArrow.addEventListener('click', () => {
        offset = offset + 20
        getData()
    })

    try {
        getData()
    } catch (e) {

    }
}