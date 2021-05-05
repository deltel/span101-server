window.onload = async () => {
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
        offset = offset - 10
        getData()
    })
    
    rightArrow.addEventListener('click', () => {
        offset = offset + 10
        getData()
    })

    try {
        getData()
    } catch (e) {

    }
}