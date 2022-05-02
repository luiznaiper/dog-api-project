
const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=a87e0d4e-0554-44c3-88c6-d0fc4983e2fa'


const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?&api_key=a87e0d4e-0554-44c3-88c6-d0fc4983e2fa'

    const reloadImg = async () => {
        try{
            const res = await fetch(API_URL_RANDOM)
            const status = res.status
            if (status !== 200) throw new Error(`New error in ${status}`)
            const data = await res.json()
            console.log('Load')
            console.log(data)
            const section = document.querySelector('#random-dogs');
            const fragment = new DocumentFragment(); 

            data.forEach(dog => {
                const div = document.createElement('div');
                div.classList.add('dog-container')
                const img = document.createElement('img');
                img.width = 150
                const button = document.createElement('button');
                const btnText = document.createTextNode('Save in favorites');
                img.src = dog.url; 

                button.addEventListener('click', saveFavorite.bind('id-dog', dog.id))
                button.appendChild(btnText)
                div.appendChild(img)
                div.appendChild(button)

                fragment.appendChild(div)
            })
            section.appendChild(fragment)

            img1.src = data[0].url
            img2.src = data[1].url
            img3.src = data[2].url

            btn1.onclick = ()=> saveFavorite( data[0].id)
            btn2.onclick = ()=> saveFavorite( data[1].id)
            btn3.onclick = ()=>  saveFavorite( data[2].id)

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
        console.log('Favorites')
        console.log(data)
            data.forEach(dog => {
                const section = document.getElementById('favorite-dogs')
                const div = document.createElement('div')
                div.classList.add('dog-container')
                const img = document.createElement('img')
                const btn = document.createElement('button')
                const btnText = document.createTextNode('Delete from favorites')
                btn.appendChild(btnText)
                img.src =  dog.image.url
                img.width = 150
                
                div. appendChild(img)
                div. appendChild(btn)
                
                section.appendChild(div)

            })
        } catch (error){
            console.log(error)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = `${error}`
        }
        
    }

    const saveFavorite = async (id) =>{
        try{
            const res = await fetch(API_URL_FAVORITES, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image_id: id
                })
            })
            const status = res.status
            if (status !== 200) throw new Error(`New error in ${status}`)
            const data = await res.json()
            console.log('Save')
            console.log(res)
        } catch (error){
            console.log(error.message)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = `${error.message}`
        }
       
    }

    reloadImg();
    loadFavImg()
   