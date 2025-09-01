# Frontend - Sistema de Agendamento de Transferências

### O frontend foi construído em Vue 3 com Pinia para gerenciamento de estado e Vue Router para navegação. O projeto segue uma estrutura modular:

- components
    - Componentes reutilizáveis da interface.

- store
    - Estado centralizado da aplicação (Pinia).

- router
    - Configuração das rotas da aplicação.

- service
    - Comunicação com o backend via Axios (camada de integração).

- view
    - Telas principais da aplicação, que consomem os componentes.

Benefício: Essa organização segue boas práticas de aplicações Vue modernas, mantendo baixa acoplabilidade e alta coesão entre as partes.

## Tecnologias utilizadas
- [Vue 3](https://vuejs.org/)
- [Vite 7](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- Node.js v22.9.0

## Pré-requisitos
- [Node.js 22.9.0](https://nodejs.org/en/)

## Como rodar o projeto
1. Clone este repositório:
   ```bash
   git clone https://github.com/Desafio-Agendamento-Trasnferencia/painel-tranferencia.git
   ```
2. Acesse a pasta do frontend:
   ```bash
   cd painel-tranferencia
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. A aplicação estará disponível na porta **5173**:
   ```
   http://localhost:5173
   ```
