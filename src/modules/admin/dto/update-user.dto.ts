import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { AutoMap } from 'nestjsx-automapper'
export class UpdateUserDto {
	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	id: string

	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	active: boolean

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
	@ApiProperty()
	lang?: string

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
	@IsNotEmpty()
	@ApiProperty()
	companyId?: string

	@ApiProperty({ type: [String] })
	roles: string[]

	@ApiProperty({ type: String })
	profileId?: string
}
