<template>
  <div class="extrato-container">
    <table class="extrato">
      <thead>
        <tr>
          <th class="col-nome">Número</th>
          <th class="col-saldo">Saldo Atual</th>
          <th class="col-saida">Pendentes a Pagar + Taxa</th>
          <th class="col-entrada">Pendentes a Receber</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paginatedContas.length === 0">
          <td colspan="4" class="sem-dados">Nenhuma conta encontrada</td>
        </tr>
        <tr v-for="t in paginatedContas" :key="t.numero">
          <td>{{ maskConta(t.numero) }}</td>
          <td>R$ {{ t.saldo }}</td>
          <td :class="{ 'valor-saida': t.totalTransferenciasSaida > 0 }">
            {{ t.totalTransferenciasSaida > 0 ? '-' : '' }} R$ {{ t.totalTransferenciasSaida }}
          </td>
          <td :class="{ 'valor-entrada': t.totalTransferenciasEntrada > 0 }">
            {{ t.totalTransferenciasEntrada > 0 ? '+' : '' }} R$ {{ t.totalTransferenciasEntrada }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="page === 1">Anterior</button>
      <span>Página {{ page }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">Próxima</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContasStore } from '../store/contasStore'
import { maskConta } from '../utils/documentFormatter'

const store = useContasStore()
store.carregarContas()

const page = ref(1)
const pageSize = 5 // itens por página

const totalPages = computed(() => Math.ceil(store.contas.length / pageSize))

const paginatedContas = computed(() => {
  const start = (page.value - 1) * pageSize
  return store.contas.slice(start, start + pageSize)
})

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}
</script>

<style scoped>
.extrato-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.extrato {
  width: 100%;
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
  width: 100%;
}

.col-saldo {
  width: 100%;
}

.col-saida {
  width: 100%;
}

.col-entrada {
  width: 100%;
}

td.valor-saida {
  color: red;
  font-weight: 500;
}

td.valor-entrada {
  color: green;
  font-weight: 500;
}

.extrato tr:nth-child(even) td {
  background: #f9fafb;
}

.sem-dados {
  text-align: center;
  font-style: italic;
  color: #6b7280;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.pagination button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.pagination button:disabled {
  background-color: #9ca3af;
  cursor: default;
}
</style>
