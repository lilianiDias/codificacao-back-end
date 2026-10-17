import { ApiProperty } from '@nestjs/swagger';

export class CriarProdutoDto {
    //!nome do produto
    @ApiProperty({
        example: 'Café Grão de Ouro',
        description: 'Nome comercial do produto cadastrado',
       
    })


     //!preço do produto  
         @ApiProperty({
            example: 9.90,
            description: 'Preço unitário do produto'
        })
    

     //!Genero do produto  
         @ApiProperty({
            example: 'Alimento',
            description: 'Categoria do produto'
       
    })
    categoria: string;
 
 

}
