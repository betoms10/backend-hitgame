import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class UpdateProfileDto {
	@AutoMap()
	@ApiProperty()
	id: string
	@AutoMap()
	@ApiProperty()
	profile: string
	@AutoMap()
	@ApiProperty()
	status: boolean
	@AutoMap()
	@ApiProperty()
	menu: any
}
