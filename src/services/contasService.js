import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export default {
  async listar() {
    const response = await api.get('/contas')
    return response.data
  }
}
