import axios from "axios"

export const api = axios.create({
  baseURL: 'http://localhost:3300'
  // baseURL: process.env.REACT_APP_API
  // 'https://backend-bigode.herokuapp.com'
})
