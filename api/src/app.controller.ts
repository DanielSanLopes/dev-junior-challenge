import { Controller, Get, Header, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-type', 'text/html; charset=utf-8')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async health(): Promise<string> {
    return this.appService.health();
  } 

  @Post('setcheck/:cpf')
  @Header('Content-type', 'application/json; charset=utf-8')
  async setcheck(@Param('cpf') cpf:string): Promise<any>{
    return this.appService.setcheck(cpf);
  }

  // @Get('getchecklist')

  // async getchecklist(): Promise<string>{
  //   return this.appService.getchecklist();
  // }
  
}
