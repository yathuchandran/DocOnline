import axios from 'axios'
import {baseUrl }from './components/constants/Constants'
const instance =axios.create({
    baseURL: baseUrl,
})

export default instance