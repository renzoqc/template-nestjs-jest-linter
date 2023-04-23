import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { CustomException } from '../../../utils/exceptions/custom-exception'
import { HttpStatus } from '@nestjs/common'

describe('UsersService', () => {
    let service: UsersService

    const LoggerMock = {
        info: jest.fn(),
        error: jest.fn(),
    }

    beforeEach(async () => {
        jest.clearAllMocks()
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: 'winston',
                    useValue: LoggerMock,
                },
            ],
        }).compile()

        service = module.get<UsersService>(UsersService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    const testDtoMock = {
        test: '12345',
    }

    describe('test', () => {
        it('should call the right methods', async () => {
            const result = await service.test({ body: testDtoMock })
            expect(result).toEqual(true)
        })
        it('should throw CustomException', async () => {
            delete LoggerMock.info
            let result
            try {
                await service.test({ body: testDtoMock })
            } catch (error) {
                result = error
            }
            expect(result).toBeInstanceOf(CustomException)
            expect(result.status).toEqual(HttpStatus.BAD_REQUEST)
            expect(result.response).toEqual({
                error: 'Error test comment',
                errorCode: 'ERROR_TEST_CODE',
            })
        })
    })
})
