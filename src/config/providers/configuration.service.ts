import { Injectable } from '@nestjs/common'
import { AppConfig } from '../interfaces/configuration.interface'

@Injectable()
export class AppConfigService {
    get app(): AppConfig {
        return {
            port: process.env.PORT,
        }
    }

    static get logs(): { level: string } {
        return {
            level: process.env.LOG_LEVEL || 'info',
        }
    }
}
