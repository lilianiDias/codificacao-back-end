# Simple Node.js HTTP Server

Este é um **servidor web minimalista** desenvolvido em Node.js utilizando apenas o módulo nativo `http`. Ele implementa cabeçalhos de segurança básicos, logs de requisições no console e rotas em formato JSON.

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Node.js** instalado (versão 14 ou superior recomendada, com suporte a ES Modules).

### Passo a Passo

1. **Configurar o ambiente:** Certifique-se de que o seu `package.json` possui o tipo de módulo configurado para aceitar a sintaxe `import`.
   ```json
   {
     "type": "module"
   }
   ```

2. **Iniciar o servidor:** Execute o arquivo principal (ex: `server.js`) no seu terminal:
   ```bash
   node server.js
   ```

3. **Verificar os logs:** O terminal exibirá:
   ```text
   Servidor Web ativo !
   Porta: 3000
   ```

---

## 🛣️ Rotas Disponíveis

| Rota | Método | Descrição | Resposta Esperada |
| :--- | :--- | :--- | :--- |
| `/status` | `GET` | Verifica a saúde do servidor | `{"servidorWeb": "Online"}` |
| *Qualquer outra* | Qualquer | Retorna erro de página não encontrada | `{"erro": "Página não encontrada !"}` |

---

## 🔒 Segurança e Funcionalidades

* **Segurança no Cabeçalho (Headers):** 
  * `X-Content-Type-Options: nosniff` — Impede que o navegador tente adivinhar o tipo de mídia (MIME type).
  * `X-Frame-Options: DENY` — Evita ataques de Clickjacking, impedindo que a página seja renderizada dentro de frames/iframes.
* **Logs em tempo real:** Toda requisição exibe o método e a rota acessada diretamente no console do servidor.
