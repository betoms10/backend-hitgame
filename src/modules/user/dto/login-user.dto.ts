import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LoginUserDto {
	@IsNotEmpty()
	@ApiProperty()
	userName: string
	@IsNotEmpty()
	@ApiProperty()
	password: string
	@IsNotEmpty()
	@ApiProperty()
	companyId: string
}
