import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { JogosController } from './jogos.controller.js';
import { JogosService } from './jogos.service.js';

@Module({
  imports: [],
  controllers: [AppController, JogosController],
  providers: [AppService, JogosService],
})
export class AppModule {}
