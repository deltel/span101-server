window.onload = async () => {
    const contentDiv = document.querySelector('.content')
    const updateInfoDiv = document.querySelector('.update-info')
    const titleDiv = document.querySelector('.title')

    const capitalizeWord = (label) => {
        const capitalLetter = label.charAt(0).toUpperCase()
        return capitalLetter + label.slice(1)
    }

    const transformLabel = (label) => {
        if (label === 'part_of_speech') {
            const tempValue = label.split('_')
            tempValue[0] = capitalizeWord(tempValue[0])
            tempValue[2] = capitalizeWord(tempValue[2])
            return tempValue.join(' ')
        }
        
        if (['created_at', 'updated_at'].includes(label)) {
            const tempValue = label.split('_')
            tempValue[0] = capitalizeWord(tempValue[0])
            tempValue[1] = capitalizeWord(tempValue[1])
            return tempValue.join(' ')
        }

        return capitalizeWord(label)
    }

    try {
        const response = await fetch('/words' + window.location.pathname)
        const responseJson = await response.json()
        const data = responseJson[0]

        Object.keys(data).forEach((key) => {
            const returnArr = ['id', 'created_at', 'updated_at', 'value']
            if (returnArr.includes(key)) return

            const div = document.createElement('div')
            div.className = 'content-group'
            const labelSpan = document.createElement('span')
            labelSpan.className = 'label'
            labelSpan.textContent = transformLabel(key)
            
            const valueSpan = document.createElement('span')
            valueSpan.className = 'value'
            valueSpan.textContent = data[key]

            div.appendChild(labelSpan)
            div.appendChild(valueSpan)

            contentDiv.appendChild(div)
        })
        
        Object.keys(data).forEach((key) => {
            const returnArr = ['created_at', 'updated_at']
            if (!returnArr.includes(key)) return

            const div = document.createElement('div')
            div.className = 'info-group'
            const labelSpan = document.createElement('span')
            labelSpan.className = 'label'
            labelSpan.textContent = transformLabel(key) + ': '
            
            const valueSpan = document.createElement('span')
            valueSpan.className = 'value'
            valueSpan.textContent = new Date (data[key]).toString().slice(0, 15)

            div.appendChild(labelSpan)
            div.appendChild(valueSpan)

            updateInfoDiv.appendChild(div)
        })
        titleDiv.textContent = data.value
    } catch (e) {
    
    }
}