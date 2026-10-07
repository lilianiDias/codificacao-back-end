# 🎓 Aula 14 - Introdução às Edge Functions

Este repositório contém o código prático desenvolvido durante a **Aula 14**, focado no entendimento de **Edge Computing** e como executar funções serverless na borda da rede para garantir o menor tempo de resposta possível.

## 📝 Objetivo da Aula

Aprender a configurar o ambiente de execução `edge` e entender a diferença de latência em comparação com o modelo tradicional de nuvem, medindo o tempo de resposta e identificando a região do servidor.

## 🚀 O que foi desenvolvido?

Criamos uma API em TypeScript que utiliza a API nativa de `Request` e `Response` da Web. O código:
1. Define a configuração de runtime para a borda (`runtime: 'edge'`).
2. Mede o tempo exato que o processador leva para criar a resposta (`tempoDeExecucao`).
3. Retorna os dados em formato JSON com o cabeçalho apropriado.

### Código Implementado

```typescript
export const config = {
  runtime: 'edge',
};

export default function handler(req: Request) {
  const inicio = new Date();
  
  return new Response(
    JSON.stringify({
      mensagem: 'Função executada na borda de rede.',
      horarioDoServidor: new Date().toISOString(),
      regiao: 'local-dev',
      tempoDeExecucao: `${Date.now() - inicio.getTime()}ms`,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
```

## 📊 Formato da Resposta da API

Ao acessar a rota da função, o retorno gerado é:

```json
{
  "mensagem": "Função executada na borda de rede.",
  "horarioDoServidor": "2026-10-06T19:15:30.000Z",
  "regiao": "local-dev",
  "tempoDeExecucao": "0ms"
}
```

## 🛠️ Como rodar o código desta aula

1. Garanta que as dependências do projeto estejam instaladas:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento local:
   ```bash
   npm run dev
   ```
3. Abra o navegador ou o Postman e acesse a rota correspondente (ex: `http://localhost:3000/api/hora-servidor`).
