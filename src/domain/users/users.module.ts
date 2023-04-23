import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { AppConfigModule } from '../../config/config.module'

@Module({
    imports: [
        AppConfigModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class MailsModule {}
