<template>
  <div class="extrato-container">
    <div class="extrato-wrapper">
<table class="extrato">
      <thead>
        <tr>
          <th class="col-data">Data Transferência</th>
          <th class="col-data">Data Agendamento</th>
          <th class="col-origem">Conta Origem</th>
          <th class="col-destino">Conta Destino</th>
          <th class="col-valor">Valor</th>
          <th class="col-taxa">Taxa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!store.agendamentos || store.agendamentos.length === 0">
          <td colspan="6" class="sem-dados">Nenhuma transferência agendada</td>
        </tr>
        <tr v-for="t in store.agendamentos" :key="t.id">
          <td>{{ formatarDataHora(t.dataTransferencia) }}</td>
          <td>{{ formatarData(t.dataAgendamento) }}</td>
          <td>{{ maskConta(t.contaOrigem) }}</td>
          <td>{{ maskConta(t.contaDestino) }}</td>
          <td>R$ {{ t.valor }}</td>
          <td>R$ {{ t.taxa }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script setup>
import { useTransferenciaStore } from '../store/transferenciaStore'
import { formatarData, formatarDataHora } from '../utils/dateFormatter'
import { maskConta } from '../utils/documentFormatter'


const store = useTransferenciaStore()
store.carregarAgendamentos()

</script>

<style scoped>
.extrato-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.extrato-wrapper {
  width: 100%;
  max-height: 25rem;
  overflow-y: auto;
  border: 3px solid #000000;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.extrato {
  width: 100%;
  border-collapse: collapse;
  border: 3px solid #000000;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  table-layout: fixed;
}

.extrato th,
.extrato td {
  padding: 10px 12px;
  border: 2px solid #000000;
  text-align: center;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.extrato th {
  background: #42b883;
  color: white;
  font-weight: 600;
}

.col-data {
  width: 5rem;
}

.col-origem {
  width: 5rem;
}

.col-destino {
  width: 5rem;
}

.col-valor {
  width: 3rem;
}

.col-taxa {
  width: 3rem;
}

.extrato tr:nth-child(even) td {
  background: #f9fafb;
}

.sem-dados {
  text-align: center;
  font-style: italic;
  color: #6b7280;
}
</style>
