import { Controller,
    Post,
    Body,} from '@nestjs/common';
    import { ApiTags,
        ApiOperation,
        ApiResponse} from '@nestjs/swagger';
        import {CriarProdutoDto} from "./produtos/dto/criar-produto.dto.js";

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
    @Post()
    @ApiOperation({
        summary: 'Cadastrar um novo produto no estoque',
     })

    @ApiResponse({
        status: 201,
        description: 'Produto cadastrado com sucesso'
    })

    @ApiResponse({
        status: 400,
        description: 'Erro de validação'
    })

    async create(@Body() criarProdutoDto: CriarProdutoDto) {
        return{
            id:67,
            ...criarProdutoDto,
            criadoEm: new Date().toLocaleDateString(),
        }
    }

}
