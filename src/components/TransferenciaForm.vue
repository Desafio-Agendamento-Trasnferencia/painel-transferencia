<template>
  <form @submit.prevent="agendar" class="transfer-form">
    <h2 class="title">Informações da Transferência</h2>

    <div class="field">
      <label>Conta Origem</label>
      <input v-model="form.contaOrigem" required @input="form.contaOrigem = maskConta($event.target.value)" maxlength="13"
        placeholder="000.000.000-0" />
    </div>

    <div class="field">
      <label>Conta Destino</label>
      <input v-model="form.contaDestino" required @input="form.contaDestino = maskConta($event.target.value)" maxlength="13"
        placeholder="000.000.000-0" />
    </div>

    <div class="field">
      <label>Valor</label>
      <input @input="maskValor" v-model.number="form.valor" required />
    </div>

    <div class="field">
      <label>Data Transferência</label>
      <input v-model="form.dataTransferencia" type="date" required />
    </div>

    <div class="actions">
      <button type="submit">Agendar</button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useTransferenciaStore } from '../store/transferenciaStore'
import { maskConta } from '../utils/documentFormatter'


const store = useTransferenciaStore()

const form = reactive({
  contaOrigem: '',
  contaDestino: '',
  valor: 'R$ 0',
  dataTransferencia: ''
})

async function agendar() {
  try {

    if (!validarForm(form)) {
      return
    }
    await store.agendar(form)
    const [ano, mes, dia] = form.dataTransferencia.split('-').map(Number)
    const dataTransferencia = new Date(ano, mes - 1, dia)
    dataTransferencia.setHours(0, 0, 0, 0)

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    if (dataTransferencia.getTime() === hoje.getTime()) {
      alert('Transferência realizada com sucesso!')
    } else {
      alert('Transferência agendada!')
    }
    form.contaOrigem = ''
    form.contaDestino = ''
    form.valor = 'R$ 0'
    form.dataTransferencia = ''

  } catch (e) {
    alert('Erro ao agendar transferência: ' + (e.response?.data?.message || e.message))
  }
}

function validarForm(form){
  if(!form.contaOrigem || !form.contaDestino || !form.valor || !form.dataTransferencia) {
    alert('Todos os campos são obrigatórios')
    return false
  }
  if(form.contaOrigem === form.contaDestino) {
    alert('Conta de destino não pode ser igual à conta de origem')
    return false
  }
  const valorNumerico = parseFloat(form.valor.replace(/[^\d,-]/g, '').replace(',', '.'))
  if(isNaN(valorNumerico) || valorNumerico <= 0) {
    alert('Valor deve ser um número positivo')
    return false
  }
  const hoje = new Date()
  hoje.setHours(0,0,0,0)
  const [ano, mes, dia] = form.dataTransferencia.split('-').map(Number)
  const dataTransferencia = new Date(ano, mes -1, dia)
  dataTransferencia.setHours(0,0,0,0)
  if(dataTransferencia < hoje) {
    alert('Data de transferência não pode ser no passado')
    return false
  }
  return true
}


function maskValor(e) {
  let raw = e.target.value.replace(/\D/g, '')
  if (!raw) {
    form.valor = 'R$ 0'
    return
  }
  let num = parseInt(raw, 10)
  let formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0
  }).format(num)

  form.valor = formatted
}
</script>

<style scoped>
.transfer-form {
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 8px;
  background: #ffffff;
}

.title {
  margin: 0 0 12px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  text-align: center;
}

.field {
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  margin: 12px 0;
}

.field>label {
  color: #4b5563;
  font-weight: 600;
  text-align: left;
}

.field>input {
  width: 100%;
  padding: 10px 0;
  border: none;
  outline: none;
  border-radius: 10px;
  background: #f3f4f6;
  color: black;
  text-align: center;
  transition: box-shadow 0.15s ease, background 0.15s ease;
  box-sizing: border-box;
}

.field>input[type="date"]::-webkit-calendar-picker-indicator {
  color: transparent;
  background: url("data:image/svg+xml,%3Csvg fill='black' margin='10px' xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath d='M7 10h5v5H7zM19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z'/%3E%3C/svg%3E") right;
  background-size: 20px 20px;
  cursor: pointer;
  opacity: 1;
  margin-left: -24px;
}

.field>input:focus {
  background: #ffffff;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.actions>button {
  padding: 10px 16px;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.05s ease, opacity 0.15s ease;
}

.actions>button:hover {
  opacity: 0.95;
}

.actions>button:active {
  transform: translateY(1px);
}
</style>
