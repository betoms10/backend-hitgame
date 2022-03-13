import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class ProfileVM {
	@AutoMap()
	@ApiProperty()
	id?: string

	@AutoMap()
	@ApiProperty()
	companyId?: string

	@AutoMap()
	@ApiProperty()
	profile?: string

	@AutoMap()
	@ApiProperty()
	menu?: any

	@AutoMap()
	@ApiProperty()
	status?: boolean

	@AutoMap()
	@ApiProperty()
	createdAt?: Date

	@AutoMap()
	@ApiProperty()
	updatedAt?: Date
}
