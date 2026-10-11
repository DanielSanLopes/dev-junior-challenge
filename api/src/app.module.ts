import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Pool} from 'pg';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Pool,
      useFactory: ()=>
        new Pool({
          connectionString:'postgres://desafio:desafio@localhost:5432/checkin'
        })
    }
  ],
})
export class AppModule {}
