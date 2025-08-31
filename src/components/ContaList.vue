<template>
  <div class="extrato-container">
    <table class="extrato">
      <thead>
        <tr>
          <th class="col-nome">Numero</th>
          <th class="col-saldo">Saldo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!store.contas || store.contas.length === 0">
          <td colspan="5" class="sem-dados">Nenhuma conta encontrada</td>
        </tr>
        <tr v-for="t in store.contas" :key="t.id">
          <td>{{ maskConta(t.numero) }}</td>
          <td>R$ {{ t.saldo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useContasStore } from '../store/contasStore'
import { maskConta } from '../utils/documentFormatter'

const store = useContasStore()
store.carregarContas()
</script>

<style scoped>
.extrato-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.extrato {
  width: 50%;
  border-collapse: collapse;
  border: 2px solid #000000;
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

.col-nome {
  width: 100%
}

.col-saldo {
  width: 100%
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
