import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserDTO, UserRo } from './user.dto';

@Controller()
export class UserController {
    constructor(private usersService: UserService){}

    @Get('api/user')
    showAllUsers(){
        return this.usersService.showAll();
    }

    @Post('login')
    login(@Body() data: UserDTO) {
        return this.usersService.login(data);
    }

    @Post('register')
    register(@Body() data: UserDTO) {
        return this.usersService.register(data);
    }
}
