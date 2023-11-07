import { Controller, Get, Render } from '@nestjs/common';

@Controller('helloworld')
export class AppHelloworldController {
    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }

    @Get("hi")
    hello(){
        return "hello word"
    }
}
