import axios from 'axios'

const api = axios.create({
    baseURL: 'https://projetopita.herokuapp.com/',
    // baseURL: 'http://25.3.62.254:8080/',
})

export default api
