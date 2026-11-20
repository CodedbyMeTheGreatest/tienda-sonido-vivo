import axios from 'axios'

export const TOKEN_KEY = 'sv_token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})