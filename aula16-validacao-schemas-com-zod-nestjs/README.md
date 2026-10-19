# NestJS + Zod API Validation 🛡️

Este projeto demonstra a implementação de uma camada de validação e tipagem de payloads (HTTP Body) em uma API **NestJS** utilizando a biblioteca **Zod**. O objetivo é interceptar os dados enviados pelo cliente no endpoint de colaboradores, validar sua integridade e retornar erros customizados e amigáveis caso as regras de negócio não sejam cumpridas.

## 🛠️ Tecnologias

*   **Framework:** [NestJS](https://nestjs.com)
*   **Linguagem:** [TypeScript](https://typescriptlang.org)
*   **Validação de Esquemas:** [Zod](https://zod.dev)

---

## 📁 Implementação do Código

Abaixo estão os arquivos que compõem o fluxo completo de validação do cadastro de colaboradores:

### 1. Esquema de Validação (`colaborador.schema.ts`)
Este arquivo centraliza o esquema de validação do Zod, as mensagens de erro customizadas em português e a exportação do tipo TypeScript correspondente através do `z.infer`.

```typescript
import { z } from 'zod';

export const colaboradorSchema = z.object({
    nome: z.string()
    .min(3, {message:'O nome deve ter no mínimo 3 letras!'}),
    email: z.string().email({message:'O email deve ser válido'}),
    idade: z.number({message: 'A idade deve ser um número válido!'})
    .min(18, {message: 'A idade minima permitida é 18 anos!'})
    .max(65, {message: 'A idade máxima permitida é de 65 anos!'}),
    departamento: z.enum(['TI', 'RH', 'Comercial', 'Financeiro'],{
        errorMap: () => ({message: 'Departamento deve ser obrigatoriamente TI, RH, Comercial ou Financeiro'}),
    }),
});

export type Colaborador = z.infer<typeof colaboradorSchema>
```

### 2. Pipe de Validação Customizado (`zod-validation.pipe.ts`)
Um `PipeTransform` global/local que intercepta dados do tipo `body`. Caso o payload não passe na validação, ele transforma a pilha de erros complexa do Zod em um array simples e limpo com o nome do campo e a respectiva mensagem de erro.

```typescript
import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private z: z.ZodType ) {}
    
    transform(value: unknown, metadata: ArgumentMetadata ){
        // Aplica a validação apenas aos payloads enviados no corpo da requisição
        if(metadata.type !== 'body') return value;
        
        const parseResult = this.z.safeParse(value);
        
        if(!parseResult.success){
            const formatedErrors = parseResult.error.issues.map((issue) => ({
                campo: issue.path.join('.'),
                mensagem: issue.message,
            }));
            
            throw new BadRequestException({
                statusCode: 400,
                errors: formatedErrors,
            });
        }
        return parseResult.data;
    }
}
```

### 3. Controlador de Colaboradores (`colaboradores.controller.ts`)
Expõe a rota de cadastro. Ele utiliza o decorador `@UsePipes` injetando uma nova instância do `ZodValidationPipe` configurada especificamente com as regras do nosso `colaboradorSchema`.

```typescript
import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { colaboradorSchema } from "./colaborador.schema";
import type { Colaborador } from "./colaborador.schema";
import { ZodValidationPipe } from "./zod-validation.pipe";

@Controller('colaboradores')
export class ColaboradoresController {
    @Post()
    @UsePipes(new ZodValidationPipe(colaboradorSchema))
    async create(@Body() body: Colaborador){
        return {
            mensagem: 'Colaborador cadastrado com sucesso',
            dados: body,
        }
    }
}
```

### 4. Módulo da Aplicação (`app.module.ts`)
Gerencia o escopo principal, registrando os controladores e os provedores da aplicação.

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradoresController } from './colaboradores.controller';

@Module({
  imports: [],
  controllers: [AppController, ColaboradoresController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 🧪 Exemplos de Requisições (Testes da API)

### Rota: `POST /colaboradores`

#### 🟢 Cenário 1: Sucesso (Status 201)
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "nome": "João Silva",
      "email": "joao@empresa.com",
      "idade": 30,
      "departamento": "TI"
    }
    ```
*   **Resposta da API:**
    ```json
    {
      "mensagem": "Colaborador cadastrado com sucesso",
      "dados": {
        "nome": "João Silva",
        "email": "joao@empresa.com",
        "idade": 30,
        "departamento": "TI"
      }
    }
    ```

#### 🔴 Cenário 2: Falha na Validação (Status 400)
*   **Corpo da Requisição Inválido (JSON):**
    ```json
    {
      "nome": "Lu",
      "email": "email_invalido",
      "idade": 17,
      "departamento": "Marketing"
    }
    ```
*   **Resposta Formatada de Erro:**
    ```json
    {
      "statusCode": 400,
      "message": "Bad Request Exception",
      "errors": [
        { "campo": "nome", "mensagem": "O nome deve ter no mínimo 3 letras!" },
        { "campo": "email", "mensagem": "O email deve ser válido" },
        { "campo": "idade", "mensagem": "A idade minima permitida é 18 anos!" },
        { "campo": "departamento", "mensagem": "Departamento deve ser obrigatoriamente TI, RH, Comercial ou Financeiro" }
      ]
    }
    ```
