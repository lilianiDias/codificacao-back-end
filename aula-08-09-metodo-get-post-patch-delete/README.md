# 📝 API de Gerenciamento de Convidados

Esta é uma aplicação backend desenvolvida com o framework **NestJS** para o gerenciamento de uma lista de convidados. A API permite listar, buscar, atualizar a idade e remover convidados, além de simular o registro de novos nomes.

---

## 🚀 Funcionalidades

* 📋 **Listar** todos os convidados cadastrados.
* 🔍 **Buscar** um convidado específico pelo seu ID (com tratamento de erro caso não exista).
* 🔄 **Atualizar** apenas a idade de um convidado.
* ❌ **Remover** um convidado da lista pelo ID.
* ➕ **Simular** a criação de novos convidados (retornando mensagem de sucesso).

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **NestJS** (Framework progressivo para Node.js)
* **TypeScript**

---

## 🛣️ Rotas da API

A URL base para os endpoints de convidados é: `http://localhost:3000/convidados`

| Método | Endpoint | Descrição | Corpo da Requisição (Body) |
| :--- | :--- | :--- | :--- |
| **GET** | `/convidados` | Retorna todos os convidados | Nenhum |
| **POST** | `/convidados` | Registra um novo convidado | `CriarConvidadoDto` (Nome e Idade) |
| **PATCH** | `/convidados/:id` | Atualiza a idade de um convidado | `{ "idade": number }` |
| **DELETE** | `/convidados/:id` | Remove um convidado (Status 204) | Nenhum |

---

## ⚙️ Estrutura do Código Principal

O projeto está estruturado com base nos padrões do NestJS, contendo:

* **`ConvidadosService`**: Responsável pela lógica de negócios e manipulação do array em memória (`convidados`).
* **`ConvidadosController`**: Responsável por expor os endpoints e receber as requisições HTTP.
* **`AppModule`**: Módulo central que encapsula os controladores e provedores da aplicação.

---

##  Como Executar o Projeto

1. Certifique-se de ter o **Node.js** instalado em sua máquina.
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```
4. A API estará disponível em `http://localhost:3000/convidado`.