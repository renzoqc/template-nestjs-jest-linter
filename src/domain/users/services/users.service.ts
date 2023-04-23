import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { UsersDto } from '../dtos/users.dto'
import { CustomException } from '../../../utils/exceptions/custom-exception'
import { Logger } from 'winston'

@Injectable()
export class UsersService {
    constructor(
        @Inject('winston')
        private logger: Logger,
    ) {}

    async test({ body }: { body: UsersDto }): Promise<any> {
        const context = {
            method: this.test.name,
            body,
        }

        try {
            this.logger.info('test comment', context)
        } catch (error) {
            this.logger.error('error test comment', {
                context,
                error,
            })
            throw new CustomException(
                'Error test comment',
                'ERROR_TEST_CODE',
                HttpStatus.BAD_REQUEST,
            )
        }
        return true
    }
}
