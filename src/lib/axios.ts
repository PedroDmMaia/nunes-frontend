import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://nunes-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})
