# 🍎 API de Estoque de Alimentos

> Sistema de gerenciamento e monitoramento de estoque de produtos alimentícios, desenvolvido com foco em alta performance, tipagem estrita e documentação interativa.

---

## 🚀 Tecnologias Utilizadas

O ecossistema do projeto foi construído utilizando as seguintes tecnologias e conceitos de arquitetura:

*   **[NestJS](https://nestjs.com)** - Framework Node.js progressivo para a construção de aplicativos eficientes e escaláveis.
*   **[TypeScript](https://typescriptlang.org)** - Superset JavaScript adicionando tipagem estática e segurança ao código.
*   **[Swagger / OpenAPI](https://swagger.io)** - Ferramenta para estruturação, teste e documentação técnica interativa das rotas.
*   **HTML5 / CSS3 / ES6+** - Dashboard cliente semântico e responsivo para visualização dos itens.

---

## 📦 Estrutura de Código Relevante

### 1. Modelo de Dados (DTO)
Para garantir a validação na entrada dos dados da requisição, é utilizado o padrão de **Data Transfer Object (DTO)** estendido com os decoradores do Swagger:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CriarProdutoDto {
  @ApiProperty({ 
    example: 'Café Grão de Ouro', 
    description: 'Nome comercial do produto cadastrado' 
  })
  nome: string;

  @ApiProperty({ 
    example: 9.90, 
    description: 'Preço unitário do produto' 
  })
  preco: number;

  @ApiProperty({ 
    example: 'Alimento', 
    description: 'Categoria (gênero) do produto' 
  })
  categoria: string;
}
```

### 2. Controlador (Controller)
Camada responsável por interceptar os eventos HTTP e orquestrar as respostas da API:

```typescript
@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  
  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo produto no estoque' })
  @ApiResponse({ status: 201, description: 'Produto cadastrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  async create(@Body() criarProdutoDto: CriarProdutoDto) {
    return {
      id: 67,
      ...criarProdutoDto,
      criadoEm: new Date().toLocaleDateString(),
    }
  }
}
```

---

## 🔧 Configuração e Inicialização

Siga os passos abaixo para clonar e rodar o projeto localmente:

### Pré-requisitos
*   **Node.js** (versão 18 ou superior)
*   Gerenciador de pacotes **npm** ou **yarn**

### Instalação
```bash
# Clonar o repositório
$ git clone https://github.com

# Acessar a pasta do projeto
$ cd api-estoque-alimentos

# Instalar as dependências do projeto
$ npm install
```

### Executando a Aplicação
```bash
# Modo de desenvolvimento (com hot-reload)
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```
A API iniciará por padrão na porta `http://localhost:3000`.

---

## 📖 Documentação Interativa (Swagger)

Com o servidor em execução, a documentação técnica completa e a interface de testes sandbox podem ser acessadas no navegador através do endereço:

🔗 **[http://localhost:3000/docs](http://localhost:3000/docs)**

### Recursos Disponíveis na Documentação:
*   🔑 Suporte à Autenticação JWT via Bearer Token (`addBearerAuth`).
*   🧪 Botão *Try it out* para envio e simulação direta de Payloads HTTP.
*   📐 Esquemas completos e tipagem dos payloads de Entrada e Saída.

---

## 🎨 Interface Web Integrada

O projeto conta também com uma interface **Front-End Dashboard** estruturada, onde é possível:
1.  Preencher os dados baseados no DTO da aplicação.
2.  Disparar requisições simuladas para o fluxo do controlador.
3.  Monitorar métricas de total de itens e custo geral acumulado em estoque.

---
Desenvolvido com ☕ durante as práticas acadêmicas de desenvolvimento backend.
