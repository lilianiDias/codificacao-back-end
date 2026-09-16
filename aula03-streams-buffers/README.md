# Aula 03 - Streams e Buffers no Node.js

Este projeto demonstra como manipular arquivos grandes de forma eficiente utilizando **Streams** no Node.js. O objetivo principal é ler um arquivo de log massivo e filtrar as linhas de erro sem sobrecarregar a memória RAM do sistema.

## 🚀 Como Executar o Projeto

### 1. Clonar ou copiar os arquivos
Certifique-se de que os arquivos `package.json`, `gerarLogGigante.js` e `filtrarErros.js` estão no mesmo diretório.

### 2. Gerar o arquivo de log simulado
Execute o script para criar o arquivo `servidor.log` com 400 mil linhas:
```bash
node gerarLogGigante.js
```

### 3. Filtrar os erros do log
Execute o script que utiliza Streams para processar o arquivo e gerar o `apenas_erro.log`:
```bash
node filtrarErros.js
```

---

## 📂 Estrutura do Projeto

*   **`package.json`**: Configuração do projeto utilizando módulos nativos do ES (`"type": "module"`).
*   **`gerarLogGigante.js`**: Script que cria um arquivo de log simulado de grande porte de forma performática.
*   **`filtrarErros.js`**: Script principal que lê o log linha por linha e extrai apenas os registros do tipo `ERROR`.
*   **`servidor.log`**: Arquivo gerado automaticamente (não rastreado pelo Git).
*   **`apenas_erro.log`**: Resultado do filtro contendo apenas os erros encontrados.

---

## 🛠️ Tecnologias Utilizadas

*   **Node.js** (Ambiente de execução)
*   **Módulos Nativos**:
    *   `fs` (File System para manipulação de arquivos)
    *   `readline` (Para leitura de interfaces linha por linha)

---

## 📊 Benefícios do Uso de Streams

*   **Baixo consumo de memória**: O arquivo não é carregado inteiro na RAM.
*   **Velocidade**: O processamento dos dados começa assim que os primeiros bytes são lidos.
*   **Escalabilidade**: Permite processar arquivos de gigabytes ou terabytes com poucos megabytes de memória.