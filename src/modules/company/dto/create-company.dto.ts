import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class CreateCompanyDto {
	@AutoMap()
	@ApiProperty()
	name: string

	@AutoMap()
	@ApiProperty()
	legalName: string

	@AutoMap()
	@ApiProperty()
	document: string

	@AutoMap()
	@ApiProperty()
	logo: string

	@AutoMap()
	@ApiProperty()
	verticalId: string

	@AutoMap()
	@ApiProperty()
	statusId: string

	@AutoMap()
	@ApiProperty()
	subdomain: string
}
