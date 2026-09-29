# 🖼️ NestJS Image API — Aula 11 (Módulos, Uploads e Assets Estáticos)

Este repositório contém a aplicação prática desenvolvida durante a **Aula 11**. O objetivo principal foi compreender a arquitetura modular do **NestJS**, aprender a manipular o ciclo de vida de arquivos binários utilizando o interceptor `Multer` para realizar uploads de imagens, e configurar a aplicação Express subjacente para servir arquivos locais de forma estática e pública.

---

## 🧭 Índice do Documento
1. [O que foi aprendido](#-o-que-foi-aprendido)
2. [Estrutura de Pastas do Projeto](#-estrutura-de-pastas-do-projeto)
3. [Explicação Detalhada do Código](#-explicação-detalhada-do-código)
4. [Como Configurar e Executar o Projeto](#-como-configurar-e-executar-o-projeto)
5. [Guia de Teste Manual (Passo a Passo com Imagens)](#-guia-de-teste-manual-passo-a-passo)
6. [Testes Automatizados](#-testes-automatizados)
7. [Padrão de Commit Utilizado](#-padrão-de-commit-utilizado)

---

## 🚀 O que foi aprendido

* **Arquitetura Modular Avançada:** Criação e isolamento do `ImagemModule` para manter o código limpo e escalável de acordo com os princípios do NestJS.
* **Manipulação de Arquivos de Mídia (Multipart Form):** Captura segura de mídias usando o decorator `@UploadedFile()` e o interceptor `FileInterceptor`.
* **Configuração de Armazenamento em Disco (`diskStorage`):** Regras de salvamento físico na máquina, gerando hashes de tempo (`Date.now()`) e números aleatórios gigantescos para impedir a colisão e sobrescrita de imagens de usuários diferentes.
* **Validação Rigorosa de Extensões:** Bloqueio direto na API via `fileFilter` para rejeitar arquivos maliciosos, permitindo de forma estrita apenas imagens com extensões `.jpg`, `.jpeg` ou `.png`.
* **Serviço de Assets Estáticos:** Habilitação do `NestExpressApplication` para expor uma pasta local como uma rota web acessível por navegadores.

---

## 📂 Estrutura de Pastas do Projeto

Para o funcionamento correto do código estudado, certifique-se de que a estrutura do seu projeto está organizada da seguinte maneira:

```text
meu-projeto-nestjs/
├── src/
│   ├── app.controller.js
│   ├── app.controller.spec.ts  # Testes unitários do AppController
│   ├── app.module.js           # Módulo raiz do sistema
│   ├── app.service.js
│   ├── imagem.controller.js    # Controlador que recebe o upload
│   ├── imagem.controller.spec.ts # Testes unitários do upload
│   ├── imagem.module.js        # Submódulo focado em imagens
│   └── main.ts                 # Arquivo de inicialização e arquivos estáticos
├── uploads/                    # ⚠️ PASTA CRIADA NA RAIZ PARA SALVAR AS IMAGENS
├── package.json
└── tsconfig.json
```

---

## 💻 Explicação Detalhada do Código

### 1. Inicialização do Servidor e Ativos Estáticos (`src/main.ts`)
O NestJS, por padrão, abstrai o servidor HTTP. Para usar o método `useStaticAssets`, nós explicitamente tipamos a criação do servidor como `NestExpressApplication`. 

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // Transforma e tipa a instância da aplicação para habilitar o ecossistema Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Mapeia a pasta física local 'uploads' (raiz) para responder pela URL pública '/api/uploads/'
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: 'api/uploads/',
  });
  
  await app.listen(3000);
  console.log(`🚀 Aplicação rodando em: http://localhost:3000`);
}
bootstrap();
```

### 2. Controlador de Imagens (`src/imagem.controller.ts`)
Este componente expõe a rota de upload e implementa as travas de segurança e nomenclatura de arquivos.

```typescript
import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('imagens')
export class ImagemController {
  
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', { // O parâmetro 'file' deve ser o mesmo nome enviado no Body da requisição
      storage: diskStorage({
        destination: './uploads', // Caminho relativo onde o arquivo físico ficará salvo
        filename: (req, file, callback) => {
          // Cria uma string única: Exemplo: "171542456-48291048.png"
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Expressão regular para validar se o arquivo termina com .jpg, .jpeg ou .png
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Apenas imagens (jpg, jpeg, png) são permitidas!'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadFoto(@UploadedFile() file: Express.Multer.File) {
    // Caso o arquivo caia no filtro ou venha nulo por outro motivo, bloqueia a requisição
    if (!file) {
      throw new BadRequestException('Arquivo não enviado ou formato inválido.');
    }
    
    // Retorna para o cliente a mensagem de sucesso e a URL pública para visualização imediata
    return {
      mensagem: 'Imagem enviada com sucesso!',
      url: `http://localhost:3000/api/uploads/${file.filename}`,
    };
  }
}
```

### 3. Configuração de Módulos (`src/app.module.ts` e `src/imagem.module.ts`)

O `ImagemModule` encapsula o controlador de imagens:
```typescript
import { Module } from '@nestjs/common';
import { ImagemController } from './imagem.controller.js';

@Module({
  controllers: [ImagemController],
}) 
export class ImagemModule {}
```

O `AppModule` importa e centraliza todos os controladores globais do projeto:
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ImagemController } from './imagem.controller.js';

@Module({
  imports: [],
  controllers: [AppController, ImagemController], // Ambos os controladores ativos no ecossistema
  providers: [AppService],
})
export class AppModule {}
```

---

## 🛠️ Como Configurar e Executar o Projeto

Siga estritamente a ordem dos comandos abaixo no terminal da sua máquina para clonar e rodar o projeto do zero:

1. **Instalar Dependências de Terceiros:**
   ```bash
   npm install
   ```

2. **Criar a Pasta de Armazenamento:**
   *O código está configurado para salvar arquivos em `./uploads`. Se essa pasta não existir na raiz do seu projeto, o Multer retornará um erro ao tentar salvar a imagem. Crie-a executando:*
   ```bash
   mkdir uploads
   ```

3. **Executar em Modo de Desenvolvimento (Watch Mode):**
   ```bash
   npm run start:dev
   ```
   *O console exibirá a mensagem:* `Aplicação rodando em: http://localhost:3000`

---

## 🧪 Guia de Teste Manual (Passo a Passo)

### Passo 1: Configurar a Requisição no Postman ou Insomnia
* **Tipo do Método:** Altere de `GET` para `POST`.
* **URL do Endpoint:** Insira `http://localhost:3000/imagens/upload`.
* **Guia Body (Corpo):** Selecione a opção **Form Data** (ou *Multipart Form*).

### Passo 2: Configurar os Parâmetros da Tabela Body
Insira os dados exatamente como mapeado na tabela abaixo:

| Chave (Key) | Tipo (Type) | Valor (Value) | Descrição |
| :--- | :--- | :--- | :--- |
| `file` | **File** *(mude de Text para File)* | Selecione uma imagem (.png ou .jpg) | O binário da imagem do seu PC |

### Passo 3: Analisar a Resposta da API
Ao clicar em **Send**, se tudo estiver correto, você receberá um status `201 Created` e o seguinte JSON de retorno:

```json
{
  "mensagem": "Imagem enviada com sucesso!",
  "url": "http://localhost:3000/api/uploads/171542456000-987654321.png"
}
```

### Passo 4: Validar o Acesso Estático
Copie o link retornado na chave `"url"`, abra qualquer navegador de internet (Chrome, Edge, Firefox) e cole o link na barra de endereços. A imagem enviada deverá ser renderizada perfeitamente na tela.

---

## 🧪 Testes Automatizados (`src/imagem.controller.spec.ts`)

Abaixo está o arquivo de testes unitários completo para garantir o comportamento esperado da nossa rota, mockando o comportamento do arquivo em memória (Buffer):

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ImagemController } from './imagem.controller.js';
import { BadRequestException } from '@nestjs/common';

describe('ImagemController', () => {
  let controller: ImagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagemController],
    }).compile();

    controller = module.get<ImagemController>(ImagemController);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar a URL após o upload bem-sucedido', () => {
    // Simula a estrutura Multer.File que o NestJS aguarda
    const mockFile = {
      filename: 'foto-teste.png',
      originalname: 'teste.png',
      mimetype: 'image/png',
      buffer: Buffer.from(''),
    } as Express.Multer.File;

    const resultado = controller.uploadFoto(mockFile);

    expect(resultado).toHaveProperty('mensagem', 'Imagem enviada com sucesso!');
    expect(resultado.url).toContain('/api/uploads/foto-teste.png');
  });

