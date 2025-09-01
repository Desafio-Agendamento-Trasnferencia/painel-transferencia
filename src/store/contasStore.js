import { defineStore } from 'pinia'
import contasService from '../services/contasService'

export const useContasStore = defineStore('contas', {
  state: () => ({
    contas: [],
    erro: null,
  }),

  actions: {
    async carregarContas() {
      try {
        const response = await contasService.listar()
        this.contas = (response.contas || []).map(c => ({
          id: c.id,
          numero: c.numeroConta,
          saldo: c.saldo,
          totalTransferenciasSaida: c.totalTransferenciasSaida,
          totalTransferenciasEntrada: c.totalTransferenciasEntrada
        }))
      } catch (e) {
        this.erro =
          e.response?.data?.message ||
          e.message ||
          'Erro ao carregar contas'
      }
    },

    limparErro() {
      this.erro = null
    },
  },
})
