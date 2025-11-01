import axios from 'axios'

// Make sure VITE_API_BASE_URL is set in your frontend .env file like:
// VITE_API_BASE_URL=http://localhost:5000/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Optionally handle 401 errors globally
    return Promise.reject(err)
  }
)

export default api
