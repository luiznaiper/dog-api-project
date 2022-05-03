const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1'
})
api.defaults.headers.common['X-API-KEY'] = 'a87e0d4e-0554-44c3-88c6-d0fc4983e2fa'

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=6'

const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites'

const API_URL_DELETE_FAVORITES = (id) => `https://api.thedogapi.com/v1/favourites/${id}`

const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'



    const reloadImg = async () => {
        try{
            const res = await fetch(API_URL_RANDOM)
            const status = res.status
            if (status !== 200) throw new Error(`New error in ${status}`)
            const data = await res.json()
            console.log('Loading random dogs')
            console.log(data)
            const section = document.querySelector('#random-dogs');
            const randomContainer = document.createElement('div')
            randomContainer.classList.add('dog-cards-container')
            const fragment = new DocumentFragment(); 

            data.forEach(dog => {
                const div = document.createElement('div');
                div.classList.add('dog-container')
                const img = document.createElement('img');
                const button = document.createElement('button');
                const btnText = document.createTextNode('Save in favorites');
                img.src = dog.url; 

                button.addEventListener('click', saveFavorite.bind('id-dog', dog.id))
                button.appendChild(btnText)
                div.appendChild(img)
                div.appendChild(button)

                fragment.appendChild(div)
            })
            randomContainer.appendChild(fragment)
            section.appendChild(randomContainer)


        } catch (error){
            console.log(error)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = ` ${error}`
        }
        
}

const loadFavImg = async () => {
    try{
        const res = await fetch(API_URL_FAVORITES,{
            method: 'GET',
            headers: {
                'X-API-KEY': 'a87e0d4e-0554-44c3-88c6-d0fc4983e2fa',
            },
        })
        const status = res.status
        if (status !== 200) throw new Error(`New error in ${status}`)
        const data = await res.json()
        console.log('Favorite dogs')
        console.log(data)
            const section = document.getElementById('favorite-dogs')
            section.innerHTML = ""
            const h2 = document.createElement('h2')
            const h2Text = document.createTextNode('Favorite Dogs')
            h2.appendChild(h2Text)
            section.appendChild(h2)
            const favContainer = document.createElement('div')
            favContainer.classList.add('dog-cards-container')

            data.forEach(dog => {
                const div = document.createElement('div')
                div.classList.add('dog-container')
                const img = document.createElement('img')
                const btn = document.createElement('button')
                const btnText = document.createTextNode('Delete from favorites')
                
                btn.appendChild(btnText)
                btn.onclick = () => deleteFavorite(dog.id)
                img.src =  dog.image.url
                
                div. appendChild(img)
                div. appendChild(btn)

                favContainer.appendChild(div)
                section.appendChild(favContainer)

            })
        } catch (error){
            console.log(error)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = `${error}`
        }
        
    }

    const saveFavorite = async (id) =>{
        try{
            const  {data, status} = await api.post('/favourites',{
                image_id: id,
            })
            if (status !== 200) throw new Error(`New error in ${status}`)
            console.log('Saved in favorites')
            loadFavImg()    
        } catch (error){
            console.log(error.message)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = `${error.message}`
        }  
    }

    const deleteFavorite = async (id) =>{
        try{
            const res = await fetch(API_URL_DELETE_FAVORITES(id), {
                method: 'DELETE',
                headers: {
                    'X-API-KEY': 'a87e0d4e-0554-44c3-88c6-d0fc4983e2fa'
                }
            })
            const status = res.status
            if (status !== 200) throw new Error(`New error in ${status}`)
            console.log('Deleted from favorites')
            console.log(res)
            loadFavImg()
        } catch (error){
            console.log(error.message)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = `${error.message}`
        }  
    }

    const uploadPicture = async () =>{
        try{
            const form = document.getElementById('upload-form')
            const formData = new FormData(form)
             const res = await fetch (API_URL_UPLOAD, {
            method: 'POST',
            headers: {
                'X-API-KEY': 'a87e0d4e-0554-44c3-88c6-d0fc4983e2fa',
            },
            body: formData,
        })
        const status = res.status
        const data = await res.json()
        if (status !== 201) throw new Error(`New error in ${status}`)
        console.log(formData.get('file'))
        console.log('Picture uploaded!')
        saveFavorite(data.id)
        } catch (error){
            console.log(error.message)
            const errorNode = document.querySelector('#random-error')
            errorNode.innerText = `${error.message}`
        }      
    }

    reloadImg();
    loadFavImg()
   