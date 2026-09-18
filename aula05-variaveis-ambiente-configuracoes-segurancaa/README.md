# Aula 05 - Variáveis de Ambiente, Configurações e Segurança

Este projeto demonstra como gerenciar variáveis de ambiente de forma segura em uma aplicação Node.js (ESM), utilizando o **dotenvx** para criptografar dados sensíveis diretamente no repositório.

## 🚀 Como Iniciar

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

### 2. Instalação das Dependências
Instale as dependências padrão do projeto:
```bash
npm install
```

Para utilizar o fluxo de segurança baseado no `dotenvx`, instale o CLI globalmente ou use via `npx`:
```bash
npm install @dotenvx/dotenvx --global
```

### 3. Configuração do Ambiente
Crie ou configure o seu arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=8080
API_KEY_PAGAMENTO=sua_chave_secreta_aqui
DATABASE_URL=mongodb://localhost:27017/seu-banco
```

---

## 🔒 Fluxo de Segurança com Dotenvx

Em vez de ignorar o arquivo `.env` no `.gitignore` e correr o risco de perder as configurações, o `dotenvx` permite criptografar os valores para que eles possam trafegar com segurança junto ao seu código no Git.

### Passo 1: Criptografar o arquivo .env
Execute o comando de criptografia. Os valores originais serão transformados em textos criptografados (ciphertext), e uma chave privada será gerada automaticamente no seu gerenciador de credenciais do sistema operacional.
```bash
dotenvx encrypt
```

### Passo 2: Commitar as alterações
Agora que o arquivo `.env` está criptografado e seguro, adicione e envie para o Git:
```bash
git add .env
git commit -m "Criptografa o arquivo .env com dotenvx"
```

### Passo 3: Executar a Aplicação
Para rodar o projeto decodificando as variáveis em tempo de execução de forma transparente:
```bash
dotenvx run -- node index.js
```

---

## 🌐 Produção e CI/CD

Quando for implantar a aplicação em produção, você não precisará copiar variável por variável. Basta levar o arquivo `.env` criptografado junto com o código e definir apenas uma variável global na sua plataforma de hospedagem ou pipeline de CI:

* **Nome da variável:** `DOTENV_PRIVATE_KEY`
* **Valor:** A chave privada gerada pelo comando `dotenvx encrypt` (você pode visualizá-la localmente no arquivo `.env.keys` criado pelo ecossistema).

Com essa chave configurada no servidor, o comando de inicialização continuará sendo:
```bash
dotenvx run -- node index.js
```

## 🛠️ Scripts Disponíveis
Se preferir automatizar os comandos dentro do `package.json`, você pode adicionar:
```json
"scripts": {
  "start": "dotenvx run -- node index.js"
}
```
E rodar diretamente com:
```bash
npm start
```
