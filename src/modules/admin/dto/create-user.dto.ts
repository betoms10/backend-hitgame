import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { AutoMap } from 'nestjsx-automapper'

export class CreateUserDto {
	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	firstName: string

	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	lastName: string

	@IsEmail()
	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	email: string

	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	userName: string

	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	lang?: string

	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	password: string

	@AutoMap()
	@ApiProperty()
	phoneNumber?: string

	@AutoMap()
	@ApiProperty()
	department?: string

	@AutoMap()
	@ApiProperty()
	theme?: string

	@AutoMap()
	@ApiProperty()
	timezone?: string

	@AutoMap()
	@ApiProperty()
	master?: boolean

	@AutoMap()
	@ApiProperty()
	avatar?: Buffer

	@AutoMap()
	@ApiProperty()
	companyId?: string

	@ApiProperty({ type: [String] })
	roles?: string[]

	@AutoMap()
	@ApiProperty({ type: String })
	profileId?: string
}
