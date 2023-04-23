import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomException extends HttpException {
    errorCode: string
    error: string
    statusCode: HttpStatus
    extra?: Record<string, any>

    constructor(
        error: string,
        errorCode: string,
        statusCode: HttpStatus,
        extra?: Record<string, any>,
    ) {
        super(
            {
                ...extra,
                error,
                errorCode,
            },
            statusCode,
        )
        this.extra = extra
        this.errorCode = errorCode
        this.error = error
        this.statusCode = statusCode
    }
}
