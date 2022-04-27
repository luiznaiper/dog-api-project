
const URL = 'https://api.catboys.com/img'

    fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img')
        img.src = data.url
        console.log(img)
    })

