import { Controller, Get } from 'routing-controllers';

@Controller()
export class AppController {
  
  @Get('/')
  getAuthor(): { author: string } {
    return { author: 'Richman' }; 
  }
}
