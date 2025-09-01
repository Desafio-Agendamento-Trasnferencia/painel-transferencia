<template>
  <div class="home">
    <h1>Sistema de Agendamento de Transferências</h1>
    <p>Bem-vindo! Escolha uma das opções abaixo:</p>

    <nav>
      <router-link to="/agendar" class="btn">Agendar Transferência</router-link>
      <router-link to="/extrato" class="btn">Ver Extrato</router-link>
    </nav>

    <section v-if="ultimos.length">
      <h2>Últimos agendamentos</h2>
      <ul>
        <li v-for="t in ultimos" :key="t.id">
          {{ formatarData(t.dataAgendamento) }} → R$ {{ t.valor }} 
          (Origem: {{ maskConta(t.contaOrigem) }} / Destino: {{ maskConta(t.contaDestino) }})
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { useTransferenciaStore } from '../store/transferenciaStore'
import { computed, onMounted } from 'vue'
import { maskConta } from '../utils/documentFormatter'
import { formatarData } from '../utils/dateFormatter'

const store = useTransferenciaStore()

onMounted(() => {
  store.carregarAgendamentos()
})

// pega só os 3 últimos agendamentos
const ultimos = computed(() => store.agendamentos.slice(-3).reverse())
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

nav {
  margin: 1rem 0;
}

.btn {
  display: inline-block;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background: #42b883;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}
.btn:hover {
  background: #2a8f6a;
}
</style>
