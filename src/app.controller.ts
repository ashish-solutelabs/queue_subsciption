import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageServiceProducer } from './message.producer.service';

@Controller()
export class AppController {
  constructor(
    private messageServiceProducer: MessageServiceProducer,
    private readonly appService: AppService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('invoke-msg')
  getInvokeMsg(@Query('msg') msg:string){
    this.messageServiceProducer.message(msg);
    return msg
  }


}
