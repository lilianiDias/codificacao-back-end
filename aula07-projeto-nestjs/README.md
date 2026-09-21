# Servidor Nest.js - Aula 07

Este projeto é uma API simples desenvolvida com o framework [NestJS](https://docs.nestjs.com/) para demonstrar os conceitos básicos de **Controllers**, **Services** e **Injeção de Dependência** apresentados na Aula 07.

## 🚀 Funcionalidades

A aplicação expõe um endpoint HTTP para verificação do status do servidor:
*   **GET /status**: Retorna uma string confirmando que o servidor está ativo.

---

## 🛠️ Tecnologias Utilizadas

*   [Node.js](https://nodejs.org)
*   [NestJS](https://docs.nestjs.com/)
*   [TypeScript](https://typescriptlang.org)

---

## 📂 Estrutura do Código Principal

O fluxo da requisição baseia-se em dois arquivos principais:

### 1. Service (`app.service.ts`)
Responsável pela regra de negócio e lógica de dados. Utiliza o decorador `@Injectable()` para permitir que o NestJS gerencie sua instância.

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servidor Nest.JS ativo [Aula 07]';
  }
}
```

### 2. Controller (`app.controller.ts`)
Responsável por receber as requisições HTTP na rota `/status` e mapear as respostas utilizando o `AppService` injetado pelo construtor.

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

### Instalação
1. Clone o repositório ou navegue até a pasta do projeto.
2. Instale as dependências executando:
```bash
npm install
```

### Executando a Aplicação
Inicie o servidor em modo de desenvolvimento:
```bash
npm run start:dev
```

Por padrão, o servidor estará rodando em `http://localhost:3000`.

### Como Testar
Abra o seu navegador ou utilize uma ferramenta como o Postman e acesse o endpoint:
```text
http://localhost:3000/status
```
**Resposta esperada:**
```text
Servidor Nest.JS ativo [Aula 07]
```

