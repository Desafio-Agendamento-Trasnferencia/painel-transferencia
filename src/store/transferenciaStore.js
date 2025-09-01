import { defineStore } from 'pinia'
import transferenciaService from '../services/transferenciaService'

export const useTransferenciaStore = defineStore('transferencia', {
  state: () => ({
    agendamentos: [],
    erro: null,
  }),

  actions: {
    async carregarAgendamentos() {
      try {
        const response = await transferenciaService.listar()
        this.agendamentos = (response.transferencias || []).map(t => ({
          id: t.id,
          dataTransferencia: t.dataTransferencia,
          dataAgendamento: t.dataAgendamento,
          contaOrigem: t.contaOrigem,
          contaDestino: t.contaDestino,
          valor: t.valor,
          taxa: t.taxa,
          status: t.status,
        }))
      } catch (e) {
        this.erro =
          e.response?.data?.message ||
          e.message ||
          'Erro ao carregar agendamentos'

        throw e
      }
    },

    async agendar(dados) {
      try {
        const payload = {
          contaOrigem: Number(dados.contaOrigem.replace(/\D/g, '')),
          contaDestino: Number(dados.contaDestino.replace(/\D/g, '')),
          valor: parseFloat(
            dados.valor.replace(/[^\d,]/g, '').replace(',', '.')
          ),
          dataTransferencia: dados.dataTransferencia,
        }
        await transferenciaService.agendar(payload)
      } catch (e) {
        this.erro =
          e.response?.data?.message ||
          e.message ||
          'Erro ao agendar transferência'

          throw e
      }
    },

    limparErro() {
      this.erro = null
    },
  },
})
