import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseHttpModel } from '@shared/models';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('init')
  async init(): Promise<ResponseHttpModel> {
    return {
      data: true,
      message: '',
      title: '',
    };
  }
}
