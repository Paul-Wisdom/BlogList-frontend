import axios from 'axios'
const loginUrl = '/api/login'

const login = async (userData) => {
    return axios.post(loginUrl, userData)
}

export default {login}