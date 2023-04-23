import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { AppConfigService } from './config/providers/configuration.service'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const logger = new Logger('bootstrap')
    const config = app.get(AppConfigService)
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

    await app.listen(new AppConfigService().app.port)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )

    logger.log(`Server started on port ${config.app.port}`)
}
bootstrap()
