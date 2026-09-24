import {Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class JogosService {
  private jogos = [
    { id: 1, titulo: 'Minecraft', estudio: 'Mojang Studios' },
    { id: 2, titulo: 'The Legend of Zelda', estudio: 'Nintendo' },
    { id: 3, titulo: 'Grand Theft Auto V', estudio: 'Rockstar North' },
    { id: 4, titulo: 'Elden Ring', estudio: 'FromSoftware' },
    { id: 5, titulo: 'God of War', estudio: 'Santa Monica Studio' },
  ];

  buscarPorId(id: number) {
    const jogo = this.jogos.find((jogo) => jogo.id === id);
    if (!jogo) {
      throw new NotFoundException(`Jogo com ID ${id} não localizado em nosso sistema.`);
    }
    return jogo;
  }


}