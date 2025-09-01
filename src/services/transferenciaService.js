import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export default {
  async listar() {
    const response = await api.get('/transferencias')
    return response.data
  },
  async agendar(dados) {
    const response = await api.post('/transferencias', dados)
    return response.data
  }
}
