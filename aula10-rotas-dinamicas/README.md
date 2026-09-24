# Games API - NestJS (Aula 10) 🎮

Este repositório contém o código desenvolvido e configurado durante a **Aula 10**. Trata-se de uma API REST simples estruturada com o framework **NestJS**, simulando um sistema de consulta de jogos eletrônicos com validação de parâmetros e tratamento de exceções HTTP.

---

## 🚀 Tecnologias Utilizadas

*   **[NestJS](https://nestjs.com)** - Framework Node.js progressivo para a criação de aplicações eficientes e escaláveis.
*   **TypeScript** - Superset JavaScript que adiciona tipagem estática e segurança ao código.
*   **Node.js** - Ambiente de execução Javascript server-side.

---

## 📂 Estrutura de Pastas e Configuração

O ambiente da **Aula 10** foi configurado com a seguinte estrutura de arquivos, isolando as responsabilidades de rotas, negócios e módulos:

```text
aula-10/
├── src/
│   ├── app.controller.ts     # Controller responsável pelo status do servidor
│   ├── app.service.ts        # Regra de negócio do status da aplicação
│   ├── jogos.controller.ts   # Controller que expõe as rotas de jogos
│   ├── jogos.service.ts      # Service com dados em memória e busca por ID
│   └── app.module.ts         # Módulo raiz que centraliza os componentes anteriores
├── package.json              # Configurações de dependências e scripts do projeto
├── tsconfig.json             # Configuração do compilador TypeScript
└── README.md                 # Documentação do projeto
```

*Nota: Os arquivos de código utilizam a extensão `.js` nos statements de `import` (ex: `./jogos.service.js`), seguindo as diretrizes de resolução de módulos do EcmaScript configuradas para o projeto.*

---

## 🛠️ Arquitetura do Código

A aplicação utiliza o padrão arquitetural do NestJS baseado em injeção de dependências:

*   **Controllers (`AppController` e `JogosController`)**: Portas de entrada da aplicação. Recebem as requisições HTTP, validam e transformam os dados de entrada usando Pipes, e acionam os serviços.
*   **Services (`AppService` e `JogosService`)**: Camada de persistência e lógica de negócio. `JogosService` gerencia um array em memória com dados de títulos famosos como *Minecraft*, *Elden Ring* e *GTA V*.
*   **Pipes (`ParseIntPipe`)**: Utilizado nativamente na rota de busca para garantir e converter o parâmetro `id` recebido na URL de `string` para `number` automaticamente.

---

## 📌 Rotas e Endpoints da API

### 1. Status do Servidor
Verifica se a API está online e respondendo adequadamente.
*   **URL:** `/status`
*   **Método:** `GET`
*   **Resposta (200 OK):**
    ```json
    "Status Servidor: Ativo!"
    ```

### 2. Buscar Jogo por ID
Busca as informações detalhadas de um jogo específico no sistema.
*   **URL:** `/jogos/:id`
*   **Método:** `GET`
*   **Parâmetros de Rota:** `id` *(Obrigatório. Deve ser um número inteiro)*

#### Cenários de Resposta:

*   **Sucesso (200 OK):**
    ```json
    {
      "id": 4,
      "titulo": "Elden Ring",
      "estudio": "FromSoftware"
    }
    ```
*   **ID Não Encontrado (404 Not Found):** Retornado via `NotFoundException` quando o ID é válido mas não existe na lista.
    ```json
    {
      "statusCode": 404,
      "message": "Jogo com ID 99 não localizado em nosso sistema.",
      "error": "Not Found"
    }
    ```
*   **Erro de Validação (400 Bad Request):** Interceptado pelo `ParseIntPipe` caso o parâmetro enviado não seja numérico (ex: `/jogos/abc`).
    ```json
    {
      "statusCode": 400,
      "message": "Validation failed (numeric string is expected)",
      "error": "Bad Request"
    }
    ```

---

## 💻 Como Instalar e Rodar o Projeto

### Pré-requisitos
*   [Node.js](https://nodejs.org) instalado instalado na máquina.
*   Gerenciador de pacotes `npm` (instalado junto com o Node).

### Passo a Passo

1. **Acesse a pasta da aula:**
   ```bash
   cd aula-10
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

O servidor iniciará localmente. Agora você pode abrir o seu navegador ou ferramenta de testes (como Insomnia/Postman) e testar os endpoints em: `http://localhost:3000/status` e `http://localhost:3000/jogos/1`.
