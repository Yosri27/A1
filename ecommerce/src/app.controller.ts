import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type{ Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res : Response){
    let message = this.appService.getHello();
    res.status(200).json({message:"done w a7la sba7 3lik",data:message})
  }
  @Get('/users')
  getallUsers(){

  }
}
