import { IsString, IsNotEmpty } from 'class-validator'

export class UsersDto {
    @IsString()
    @IsNotEmpty()
    test: string
}
