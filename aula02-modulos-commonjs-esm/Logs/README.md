# Sistema de Registro de Logs (Node.js)

Este é um projeto simples em Node.js desenvolvido para demonstrar o uso de **ECMAScript Modules (ESM)** no gerenciamento e escrita de arquivos de log do sistema de forma assíncrona.

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Ambiente de execução)
* **Módulos Nativos:** `fs/promises`, `path`, `url`
* **Padrão de Módulos:** ESM (`import`/`export`)

## 📂 Estrutura de Arquivos Gerada

```text
├── index.js          # Arquivo principal que executa a gravação dos logs
├── utilitario.js     # Módulo auxiliar para formatação de data e hora
├── package.json      # Configurações do projeto Node.js
└── Logs/
    └── syslog.log    # Arquivo gerado automaticamente contendo os logs gravados
```

## 💻 Código do Projeto

### 1. `package.json`
Define o uso do tipo de módulo ESM através da propriedade `"type": "module"`.

```json
{
  "name": "aula02-modulos-commonjs-esm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

### 2. `utilitario.js`
Contém a função utilitária exportada responsável por formatar a mensagem com a data e hora local atual.

```javascript
export function formatLog(mensagem){
    const dataAtual = new Date().toISOString().split('T')[0];
    const horaAtual = new Date().toLocaleTimeString();
    return `[${dataAtual} - ${horaAtual}]: ${mensagem}`;
}
```

### 3. `index.js`
Lógica principal para criar a pasta `/Logs`, gerar o arquivo `syslog.log` e anexar os registros de forma segura com tratamentos de erros.

```javascript
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatLog } from './utilitario.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function salvarlogSistema(mensagemLog){
    try {
        const pastaLog = path.join(__dirname, 'Logs');
        const arquivoLog = path.join(pastaLog, 'syslog.log');
        
        await fs.mkdir(pastaLog, { recursive: true });
        
        const registro = formatLog(mensagemLog);
        await fs.appendFile(arquivoLog, registro, 'utf-8');
        console.log('Log Registrado com sucesso ...');
    } catch(erro) {
        // Correção de um pequeno erro de sintaxe original (console.erro -> console.error)
        console.error('Erro ao registrar o log:', erro);
    }
}

salvarlogSistema('Inicialização do servidor concluída!\n');
salvarlogSistema('Conexão com banco de dados estabelecida!\n');
```

## 🚀 Como Executar o Projeto

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
2. Crie os três arquivos (`package.json`, `utilitario.js`, `index.js`) em uma mesma pasta e cole os códigos correspondentes.
3. Abra o terminal na pasta do projeto e execute:
   ```bash
   node index.js
   ```
4. Uma pasta chamada `Logs` com o arquivo `syslog.log` será criada automaticamente, contendo as mensagens formatadas.
