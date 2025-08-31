<template>
  <div id="app">
    <!-- Cabeçalho -->
    <header class="header">
      <h1 class="logo">Transferências</h1>
      <nav>
        <router-link to="/" class="link">Home</router-link>
        <router-link to="/agendar" class="link">Agendar</router-link>
        <router-link to="/extrato" class="link">Extrato</router-link>
        <router-link to="/contas" class="link">Contas</router-link>
      </nav>
    </header>

    <!-- Conteúdo dinâmico -->
    <main class="content">
      <router-view />
    </main>

    <!-- Rodapé -->
    <footer class="footer">
      <p>© 2025 - Sistema de Agendamento de Transferências</p>
    </footer>
  </div>
</template>

<script setup>
// como o App só organiza layout, não precisa de lógica aqui
</script>

<style>
/* Layout básico */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Cabeçalho */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #42b883;
  color: white;
  padding: 1rem 2rem;
}

.logo {
  margin: 0;
}

nav .link {
  margin-left: 1rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav .link:hover {
  text-decoration: underline;
}

/* Conteúdo principal */
.content {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Rodapé */
.footer {
  background: #f1f1f1;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #555;
}
</style>
