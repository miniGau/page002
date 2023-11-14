import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index.ejs')
  root() {
    return { user: { name: 'xiaoming' } };
  }
}
