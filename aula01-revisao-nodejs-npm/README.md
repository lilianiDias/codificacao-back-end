
# Aula 01: Revisão do Node.js e NPM

Este repositório contém o código e as anotações práticas da **Aula 01** 

## 🎯 Objetivos da Aula

* Compreender os conceitos do ecossistema Node.js e sua execução no lado do servidor (*Server-Side*).
* Validar e configurar o ambiente de desenvolvimento local.
* Inicializar um projeto Node.js utilizando o NPM (*Node Package Manager*).
* Desenvolver um script de diagnóstico utilizando o módulo nativo `os` para acessar recursos diretos do sistema operacional.

## 💻 Conceitos Server-Side Aplicados

Diferente da execução tradicional no navegador (*Client-Side*), onde o código JavaScript é limitado à manipulação do DOM e à interface visual, o ambiente servidor nos permite:

* **Acesso Direto ao Sistema Operacional:** O Node.js permite interagir diretamente com o hardware, memória e sistema de arquivos da máquina.
* **Execução via Terminal:** O código é interpretado diretamente pelo runtime do Node.js através da linha de comando, sem qualquer dependência de páginas HTML.
* **Arquitetura Non-blocking I/O:** Utilização do motor V8 e do mecanismo de *Event Loop* para processar instruções e requisições de forma altamente performática.

---

## 🚀 Passo a Passo da Prática

### 1. Verificação do Ambiente
Antes de iniciar, verifique se o Node.js e o NPM estão instalados corretamente em sua máquina executando os comandos abaixo no terminal:

```bash
node -v
npm -v
```

### 2. Inicialização do Projeto
Crie o diretório do projeto, navegue até ele e gere o arquivo manifesto `package.json` com as configurações padrão:

```bash
# Criar diretório do projeto
mkdir aula01-diagnostico

# Navegar até a pasta
cd aula01-diagnostico

# Inicializar o projeto Node.js
npm init -y
```

### 3. Script de Diagnóstico do Sistema
Crie um arquivo chamado `diagnostico.js` e adicione o seguinte código para mapear e exibir informações do hardware:

```javascript
// Importação do módulo nativo OS (Operating System)
const os = require('os');

console.log('=== 🖥️ DIAGNÓSTICO DO SISTEMA ===\n');

// 1. Plataforma do Sistema Operacional
console.log('Plataforma:', os.platform());

// 2. Memória Total (convertida para GB)
const totalMemGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
console.log(`Memória Total: ${totalMemGB} GB`);

// 3. Memória Livre (convertida para GB)
const freeMemGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
console.log(`Memória Livre: ${freeMemGB} GB`);

// 4. Detalhes das CPUs
console.log('Quantidade de Núcleos (CPUs):', os.cpus().length);
console.log('Modelo do Processador:', os.cpus()[0].model);
```

---

## 🛠️ Mapeamento dos Métodos Utilizados

O módulo `os` fornece utilitários relacionados ao sistema operacional. Abaixo estão as funções utilizadas nesta prática:

* `os.platform()`: Retorna uma string que identifica a plataforma do sistema operacional (ex: `win32`, `linux`, `darwin`).
* `os.totalmem()`: Retorna a quantidade total de memória RAM física do sistema em *bytes*.
* `os.freemem()`: Retorna a quantidade de memória RAM livre/disponível no sistema em *bytes*.
* `os.cpus()`: Retorna um array contendo informações detalhadas sobre cada núcleo/CPU do sistema, como modelo e velocidade.

> 📝 **Nota Técnica:** O módulo `os` é nativo do ecossistema do Node.js. Por esse motivo, **não** há necessidade de realizar sua instalação via `npm install`. Ele demonstra claramente o poder do JS no back-end, acessando recursos que seriam bloqueados em navegadores comuns por questões de segurança.

---

## 🏃‍♂️ Como Executar o Script

Para rodar a aplicação de diagnóstico e ver as especificações da sua máquina no terminal, execute o comando:

```bash
node diagnostico.js
```
