# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes e automação.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)
- Banco de dados em memória (variáveis)

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente local.
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Como rodar a aplicação

1. Inicie o servidor:
   ```bash
   node server.js
   ```
2. Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

- `POST /users/register` — Registro de usuário
- `POST /users/login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /transfers` — Realizar transferência
- `GET /transfers` — Listar transferências

## Regras de negócio
- Login e senha são obrigatórios para login.
- Não é permitido registrar usuários duplicados (login único).
- Transferências para destinatários que não são "favorecidos" só podem ser feitas se o valor for menor que R$ 5.000,00.
- O banco de dados é em memória, os dados são perdidos ao reiniciar o servidor.

## Estrutura de diretórios
- `controller/` — Rotas e controladores
- `service/` — Lógica de negócio
- `model/` — Dados em memória
- `app.js` — Configuração do Express
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação da API

## Testes
A API foi estruturada para facilitar testes automatizados, especialmente com Supertest, importando o `app.js` sem o método `listen()`.
