# 📝 Aula 13: Introdução e Implementação de Middlewares no NestJS

Nesta aula, aprendemos a implementar **Middlewares** no ecossistema do NestJS. O objetivo foi entender como interceptar requisições HTTP antes que elas cheguem até os nossos controladores (*controllers*), permitindo criar logs automáticos e aplicar validações de segurança baseadas em cabeçalhos (headers).

---

## 🚀 O que é um Middleware?

Um **Middleware** é uma função executada **antes** do manipulador de rota (*route handler*). Ele tem acesso total aos objetos de requisição (`req`), resposta (`res`) e à próxima função de middleware no ciclo de solicitação-resposta do aplicativo, chamada de `next()`.

Com o código desenvolvido, conseguimos:
1. **Registrar logs** automáticos no terminal com o método e a rota acessada.
2. **Interromper a requisição** prematuramente (retornando erro `403`) caso o usuário tente acessar a rota administrativa sem as credenciais corretas.

---

## 📦 Estrutura de Arquivos da Aula

O projeto desta aula foi dividido nos seguintes arquivos:

* `src/logger/logger.middleware.ts` — Classe que intercepta as requisições, faz o log e valida o acesso admin.
* `src/logger/logger.middleware.spec.ts` — Arquivo de teste unitário do middleware.
* `src/app.controller.ts` — Controlador com as rotas pública e privada (`/admin`).
* `src/app.module.ts` — Módulo principal onde o middleware é registrado globalmente.

---

## 🛠️ Código Fonte Base

### 1. Middleware de Log e Segurança (`logger.middleware.ts`)
```typescript
import { Injectable, NestMiddleware } from '@nestjs/common'; 
import { Request, Response, NextFunction } from 'express'; 

@Injectable() 
export class LoggerMiddleware implements NestMiddleware { 
  use(req: Request, res: Response, next: NextFunction) { 
    const currentUrl = req.originalUrl || req.url; 

    // Log automático no console do servidor
    console.log(`[LOG] Método: ${req.method} | Rota: ${req.path}`); 

    // Bloqueio de segurança para rotas '/admin'
    if(currentUrl.startsWith('/admin')){ 
      const base = req.headers['x-user-base']; 

      if (base !== 'Administrator'){ 
        return res.status(403).json({ 
          Codigo: 403, 
          message: 'Acesso negado. Previlégio de administrator necessário.', 
          registro: new Date(), 
        }) 
      } 
    } 

    // Autoriza a requisição a seguir para o Controller
    next(); 
  } 
}
```

### 2. Controlador de Rotas (`app.controller.ts`)
```typescript
import { Controller, Get } from '@nestjs/common'; 

@Controller() 
export class AppController { 
  @Get() 
  getPublic(){ 
    return { 
      mensagem : 'Rota pública acessada com sucesso!', 
      data : new Date(), 
    } 
  } 

  @Get('admin') 
  getPrivate(){ 
    return { 
      mensagem : 'Bem-vindo ao Painel Administrativo!', 
      data : new Date(), 
    } 
  } 
}
```

### 3. Configuração do Módulo Principal (`app.module.ts`)
No NestJS, os middlewares são configurados implementando a interface `NestModule`.
```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'; 
import { AppController } from './app.controller.js'; 
import { LoggerMiddleware } from './logger/logger.middleware.js'; 

@Module({ 
  controllers: [AppController], 
}) 
export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) { 
    // Aplica o logger para todas as rotas ('*') da aplicação
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  } 
}
```

### 4. Teste Unitário (`logger.middleware.spec.ts`)
```typescript
import { LoggerMiddleware } from './logger.middleware.js'; 

describe('LoggerMiddleware', () => { 
  it('should be defined', () => { 
    expect(new LoggerMiddleware()).toBeDefined(); 
  }); 
});
```

---

## ⚙️ Instalação e Execução

### 1. Instalar as dependências do projeto
Certifique-se de que os tipos do Express estejam instalados (já que o NestJS utiliza o Express por padrão por baixo dos panos):
```bash
npm install
```
Se precisar instalar explicitamente os tipos do express para o TypeScript:
```bash
npm install --save-dev @types/express
```

### 2. Rodar a aplicação em modo de desenvolvimento
Para iniciar o servidor local com recarregamento automático a cada alteração de código (*hot-reload*):
```bash
npm run start:dev
```

### 3. Executar o teste unitário do middleware
Para rodar o arquivo de testes `.spec.ts` criado e verificar se o middleware está definido corretamente:
```bash
npm run test
```

---

## 🧪 Como Validar e Testar a Aplicação

Você pode testar o comportamento das rotas usando clientes HTTP como **Postman**, **Insomnia** ou a extensão **REST Client** do VS Code.

### Cenário 1: Testando a Rota Pública
* **Requisição:** `GET http://localhost:3000/`
* **Resposta Esperada (Status 200):** Retorna o objeto JSON confirmando o acesso público.
* **Console do Servidor:** Exibirá a linha `[LOG] Método: GET | Rota: /`.

### Cenário 2: Bloqueio na Rota Admin (Sem Cabeçalho)
* **Requisição:** `GET http://localhost:3000/admin`
* **Resposta Esperada (Status 403 Forbidden):**
  ```json
  {
    "Codigo": 403,
    "message": "Acesso negado. Previlégio de administrator necessário.",
    "registro": "2026-09-30T..."
  }
  ```

### Cenário 3: Acesso Liberado na Rota Admin (Com Cabeçalho)
* **Requisição:** `GET http://localhost:3000/admin`
* **Headers da Requisição:** Adicione a chave `x-user-base` com o valor `Administrator`.
* **Resposta Esperada (Status 200):** Retorna a mensagem de boas-vindas: `"Bem-vindo ao Painel Administrativo!"`.
