import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { UsersController } from './users.controller'
import { UsersService } from '../services/users.service'
import { Response } from 'express'
import { AppConfigService } from '../../../config/providers/configuration.service'

describe('UsersController', () => {
    let controller: UsersController
    let app: NestApplication

    const UsersServiceMock = {
        test: jest.fn(),
    }

    const ResponseMock = {
        status: jest.fn(),
    }

    const AppConfigServiceMock = {
        admin: {
            guardSecret: 'secret12345',
        },
    }

    beforeEach(async () => {
        jest.clearAllMocks()
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: UsersServiceMock,
                },
                {
                    provide: Response,
                    useValue: ResponseMock,
                },
                {
                    provide: AppConfigService,
                    useValue: AppConfigServiceMock,
                },
            ],
        }).compile()

        controller = module.get<UsersController>(UsersController)
        app = module.createNestApplication()
        app.useGlobalPipes(new ValidationPipe())

        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    const testBodyMock = {
        test: '12345',
    }

    describe('POST - /test', () => {
        it('should call rigth methods', async () => {
            UsersServiceMock.test.mockResolvedValue(testBodyMock)
            const res = await request(app.getHttpServer()).post('/users/test/').send(testBodyMock)
            expect(res.status).toEqual(HttpStatus.CREATED)
            expect(res.body).toEqual(testBodyMock)
        })
    })
})
