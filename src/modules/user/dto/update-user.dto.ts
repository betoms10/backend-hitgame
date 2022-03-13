import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { AutoMap } from 'nestjsx-automapper'
export class UpdateUserDto {
	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	id: string

	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	firstName: string

	@AutoMap()
	@IsNotEmpty()
	@ApiProperty()
	lastName: string

	@AutoMap()
	@ApiProperty()
	phoneNumber?: string
}
