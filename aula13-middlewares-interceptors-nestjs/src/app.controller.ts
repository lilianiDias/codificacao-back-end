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
