# Aula 15: Tratamento de Erros e Status Codes no NestJS

Este projeto foi desenvolvido como material prático da **Aula 15**, com o objetivo de demonstrar como gerenciar respostas HTTP, validar parâmetros de rotas e implementar o tratamento de exceções utilizando os recursos nativos do **NestJS**.

---

## 🚀 Funcionalidades

*   **Listagem de Produtos:** Retorna um catálogo completo com produtos alimentícios simulados em memória.
*   **Busca por ID:** Filtra e localiza um produto específico utilizando parâmetros de rota (`/produtos/:id`).
*   **Validação de Entrada:** Intercepta e valida se o ID enviado na URL é estritamente um valor numérico.
*   **Tratamento de Exceções Nativo (`Built-in Exceptions`):** Retorna os códigos de status HTTP corretos (`400 Bad Request` e `404 Not Found`) formatados em JSON padrão.
*   **Logs Estruturados:** Utiliza a classe `Logger` integrada do NestJS para registrar falhas críticas no terminal do servidor, facilitando a auditoria.

---

## 📦 Estrutura do Código

A lógica deste módulo está dividida em três arquivos principais seguindo a arquitetura padrão do framework:

*   **`AppModule` (`app.module.ts`)**: Módulo raiz que centraliza a aplicação, injetando o `ProdutosController` e registrando o `ProdutosService` como provedor.
*   **`ProdutosController` (`produtos.controller.ts`)**: Camada responsável por expor as rotas HTTP, capturar os parâmetros fornecidos pelo cliente, realizar validações de tipo e disparar as exceções controladas.
*   **`ProdutosService` (`produtos.service.ts`)**: Camada de serviço encarregada pela lógica de negócio e pela persistência temporária da lista de produtos (Mock).

---

## 🛠️ Endpoints e Comportamento dos Status Codes

### 1. Buscar Produto por ID (Sucesso)
Retorna os dados detalhados do item caso o identificador exista.
*   **Rota:** `GET /produtos/:id`
*   **Status Code:** `200 OK`
*   **Exemplo de Requisição:** `GET /produtos/1`
*   **JSON de Resposta:**
    ```json
    {
      "id": 1,
      "nome": "Arroz Namorados",
      "preco": 9.99
    }
    ```

### 2. ID Não Numérico (Erro de Validação)
Disparado via `BadRequestException` caso o parâmetro informado na URL não seja um número válido.
*   **Rota:** `GET /produtos/abc`
*   **Status Code:** `400 Bad Request`
*   **JSON de Resposta:**
    ```json
    {
      "message": "O ID do produto deve ser um número inteiro.",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```
*   **Log no Servidor:** `[ProdutosController] Tentativa de buscar produto com ID: abc não numérico.`

### 3. Produto Não Localizado (Erro de Escopo)
Disparado via `NotFoundException` quando o ID informado é um número válido, mas não consta na base de dados fictícia.
*   **Rota:** `GET /produtos/99`
*   **Status Code:** `404 Not Found`
*   **JSON de Resposta:**
    ```json
    {
      "message": "Produto com ID: 99 não encontrado.",
      "error": "Not Found",
      "statusCode": 404
    }
    ```
*   **Log no Servidor:** `[ProdutosController] Produto com ID: 99 não localizado.`

---

## 🗄️ Dados em Memória (Mock)

O `ProdutosService` inicia com os seguintes produtos cadastrados por padrão:

| ID  | Nome do Produto   | Preço (R\$) |
|:---:|:------------------|:----------:|
|  1  | Arroz Namorados   |    9.99    |
|  2  | Feijão Timbiras   |    7.99    |
|  3  | Macarrão Galo     |    5.99    |
|  4  | Açúcar União      |    4.99    |
|  5  | Sal Lebre         |    2.99    |

---

## 💻 Como Executar o Projeto

### Pré-requisitos
*   [Node.js](https://nodejs.org) (versão 18 ou superior recomendada)
*   [NPM](https://npmjs.com) ou outro gerenciador de pacotes equivalente.

### Passos para Instalação

1. Clone este repositório para sua máquina local.
2. Acesse a pasta do projeto e instale as dependências necessárias:
   ```bash
   npm install
   ```

### Inicializando o Servidor

Para rodar a aplicação em modo de desenvolvimento com *Hot Reload* (atualização automática ao salvar arquivos):
```bash
npm run start:dev
```

A API estará pronta para receber requisições no endereço padrão: `http://localhost:3000`

---

## 🟣 Testando com o Insomnia

Para facilitar os testes dos fluxos de sucesso e de tratamento de erro, você pode importar nossa coleção diretamente no **Insomnia**.

### Como Importar:
1. Abra o **Insomnia**.
2. Clique no botão **Import** (ou vá em *Application* > *Preferences* > *Data* > *Import Data*).
3. Selecione a opção **From Clipboard** (Da Área de Transferência) ou crie um arquivo chamado `insomnia_collection.json` com o código abaixo.

### JSON da Coleção:
```json
{
  "_type": "export",
  "__export_format": 4,
  "__export_date": "2026-10-07T00:00:00.000Z",
  "__export_source": "insomnia.desktop.app:v10.0.0",
  "resources": [
    {
      "_id": "wrk_produtos_api",
      "parentId": null,
      "modified": 1700000000000,
      "created": 1700000000000,
      "name": "Aula 15 - NestJS Erros",
      "description": "Coleção para testar tratamento de erros e status codes",
      "_type": "workspace"
    },
    {
      "_id": "req_buscar_sucesso",
      "parentId": "wrk_produtos_api",
      "modified": 1700000000000,
      "created": 1700000000000,
      "url": "http://localhost:3000/produtos/1",
      "name": "Buscar por ID (Sucesso - 200 OK)",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "_type": "request"
    },
    {
      "_id": "req_erro_validacao",
      "parentId": "wrk_produtos_api",
      "modified": 1700000000000,
      "created": 1700000000000,
      "url": "http://localhost:3000/produtos/abc",
      "name": "ID Não Numérico (Erro - 400 Bad Request)",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "_type": "request"
    },
    {
      "_id": "req_erro_not_found",
      "parentId": "wrk_produtos_api",
      "modified": 1700000000000,
      "created": 1700000000000,
      "url": "http://localhost:3000/produtos/99",
      "name": "Produto Inexistente (Erro - 404 Not Found)",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "_type": "request"
    }
  ]
}
```

---

## 🛠️ Tecnologias Utilizadas

*   **NestJS** - Framework progressivo em Node.js para a criação de aplicações eficientes e escaláveis.
*   **TypeScript** - Superset que adiciona tipagem estática opcional ao ecossistema JavaScript.
*   **Insomnia** - Cliente HTTP para testes de API Rest.
