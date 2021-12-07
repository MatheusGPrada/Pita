import axios from 'axios'

const api = axios.create({
    baseURL: 'https://projetopita.herokuapp.com/',
})

export default api
