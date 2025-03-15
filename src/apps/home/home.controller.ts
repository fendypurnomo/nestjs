import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {Response} from 'express';
import {Public} from 'src/apps/auth/decorator';

@Controller()
export class HomeController {
  @Public()
  @Get()
  async home(@Res() res: Response): Promise<any> {
    return res.status(HttpStatus.OK).json({message: 'Welcome to Nestjs Web API'});
  }
}
