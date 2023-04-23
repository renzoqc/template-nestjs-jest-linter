import { Module } from '@nestjs/common'
import { MailsModule } from './domain/users/users.module'
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston'
import { AppConfigService } from './config/providers/configuration.service'

@Module({
    imports: [
        WinstonModule.forRootAsync({
            useFactory: async () => ({
                transports: [
                    new winston.transports.Console({
                        level: AppConfigService.logs.level,
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            nestWinstonModuleUtilities.format.nestLike(),
                        ),
                    }),
                ],
            }),
        }),
        MailsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
