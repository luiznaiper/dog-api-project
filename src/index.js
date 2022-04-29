
const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=a87e0d4e-0554-44c3-88c6-d0fc4983e2fa'


const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=3&api_key=a87e0d4e-0554-44c3-88c6-d0fc4983e2fa'

    const reloadImg = async () => {
        try{
            const res = await fetch(API_URL_RANDOM)
            const status = res.status
            if (status !== 200) throw new Error(`New error in ${status}`)
            const data = await res.json()
            console.log(data)
            const img1 = document.getElementById('img1')
            const img2= document.getElementById('img2')
            const img3 = document.getElementById('img3')
            img1.src = data[0].url
            img2.src = data[1].url
            img3.src = data[2].url
        } catch (error){
            console.log(error)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = ` ${error}`
        }
        
}

const loadFavImg = async () => {
    try{
        const res = await fetch(API_URL_FAVORITES)
        const status = res.status
        if (status !== 200) throw new Error(`New error in ${status}`)
        const data = await res.json()
        console.log(data)
        } catch (error){
            console.log(error)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = `${error}`
        }
        
    }

    //async function saveFavorites

    reloadImg();
    loadFavImg()
