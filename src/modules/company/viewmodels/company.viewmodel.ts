import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class CompanyVM {
	@AutoMap()
	@ApiProperty()
	id?: string

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
	subdomain: string
}
