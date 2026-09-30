# 🚀 NestJS Server - Status & Segurança (Aula 12)

Este repositório contém o código-fonte desenvolvido durante a **Aula 12**. O objetivo desta aula foi compreender a arquitetura fundamental do framework [NestJS](https://nestjs.com), trabalhando com **Módulos**, **Controllers**, **Providers (Services)** e a introdução a **Testes Unitários**.

O projeto inicializa um servidor web com uma rota de verificação de integridade (*health check*) e prepara a estrutura para o módulo de segurança da aplicação.

---

## 📋 Índice

*   [Conceitos Praticados na Aula](#-conceitos-praticados-na-aula)
*   [Funcionalidades](#-funcionalidades)
*   [Tecnologias e Ferramentas](#%EF%B8%8F-tecnologias-e-ferramentas)
*   [Estrutura do Projeto](#-estrutura-do-projeto)
*   [Rotas da API](#-rotas-da-api)
*   [Como Executar o Projeto](#-como-executar-o-projeto)
*   [Testes Unitários](#-testes-unitários)

---

## 🧠 Conceitos Praticados na Aula

Durante a Aula 12, exploramos os pilares do NestJS:
1.  **Modularização (`@Module`):** Como o NestJS organiza o código em blocos isolados e reutilizáveis.
2.  **Roteamento e Controllers (`@Controller`):** Manipulação de requisições HTTP de entrada e mapeamento de rotas (Decorators `@Get`).
3.  **Injeção de Dependências (`@Injectable`):** Desacoplamento da lógica de negócio usando Services injetados via construtor.
4.  **Configuração ESM:** Uso de módulos nativos do JavaScript com suporte a extensões `.js` nos statements de `import`.

---

## 🚀 Funcionalidades

*   **Verificação de Status do Servidor:** Endpoint público para garantir que a API está online e respondendo adequadamente.
*   **Módulo de Segurança Integrado:** Registro prévio do `SegurancaController` no escopo global para receber as futuras regras de autenticação (JWT/OAuth).
*   **Ambiente de Testes Automatizados:** Configuração de suíte de testes com injeção de dependência mockada via `TestingModule`.

---

## 🛠️ Tecnologias e Ferramentas

*   **Framework Core:** NestJS (v10+)
*   **Linguagem:** TypeScript
*   **Padrão de Módulos:** Node.js ECMAScript Modules (ESM)
*   **Ambiente de Testes:** Jest & `@nestjs/testing`

---

## 📁 Estrutura do Projeto

Abaixo estão os arquivos principais modificados e criados nesta aula:

```bash
src/
├── app.module.ts            # Módulo raiz que acopla os controllers e providers
├── app.controller.ts        # Controller responsável pela rota de status (/status)
├── app.service.ts           # Service com a lógica de negócio do status da aplicação
├── seguranca.controller.ts   # Controller esqueleto criado para as funcionalidades de segurança
└── app.controller.spec.ts   # Arquivo de testes automatizados do AppController
```

---

## 🛣️ Rotas da API

| Método | Endpoint | Acesso | Descrição | Exemplo de Resposta |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/status` | Público | Retorna o estado atual de atividade do servidor. | `"Status Servidor : Ativo!"` |

---

## 💻 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:
*   [Node.js](https://nodejs.org) (Versão LTS recomendada)
*   Gerenciador de pacotes **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd <nome-da-pasta-do-projeto>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run start:dev
   ```
   *O servidor iniciará por padrão na porta **3000** (ou na porta configurada no seu arquivo `main.ts`).*

4. **Teste no seu navegador ou cliente HTTP (Postman/Insomnia):**
   ```text
   GET http://localhost:3000/status
   ```

---

## 🧪 Testes Unitários

Para validar os componentes isoladamente sem subir toda a aplicação, utilizamos o Jest.

### Nota Importante de Correção da Aula
> ⚠️ O esqueleto de teste gerado automaticamente esperava o retorno `"Hello World!"`. No entanto, como customizamos o `AppService` para retornar `"Status Servidor : Ativo!"`, a asserção do arquivo `app.controller.spec.ts` foi atualizada para evitar falhas no pipeline:

```typescript
// Trecho corrigido no arquivo app.controller.spec.ts
describe('root', () => {
  it('should return "Status Servidor : Ativo!"', () => {
    expect(appController.getHello()).toBe('Status Servidor : Ativo!');
  });
});
```

### Executando os testes:

```bash
# Executa todos os testes unitários da aplicação
npm run test

# Executa os testes em modo "watch" (observando alterações em tempo real)
npm run test:watch
```
