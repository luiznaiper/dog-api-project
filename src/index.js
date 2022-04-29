
const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=3&?api_key=a87e0d4e-0554-44c3-88c6-d0fc4983e2fa'

    async function reloadImg(){
        const res = await fetch(API_URL)
        const data = await res.json()
        const img1 = document.getElementById('img1')
        const img2= document.getElementById('img2')
        const img3 = document.getElementById('img3')
        console.log(data)
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
}
  
reloadImg()


