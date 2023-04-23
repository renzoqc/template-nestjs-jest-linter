import { Controller, Post, Body } from '@nestjs/common'
import { UsersDto } from '../dtos/users.dto'
import { UsersService } from '../services/users.service'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('test')
    async test(@Body() body: UsersDto): Promise<any> {
        return await this.usersService.test({ body })
    }
}
