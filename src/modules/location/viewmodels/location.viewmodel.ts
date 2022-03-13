import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class LocationVM {
	@AutoMap()
	@ApiProperty()
	id?: string

	@AutoMap()
	@ApiProperty()
	code: string

	@AutoMap()
	@ApiProperty()
	name: string

	@AutoMap()
	@ApiProperty()
	zipcode: string

	@AutoMap()
	@ApiProperty()
	number: string

	@AutoMap()
	@ApiProperty()
	address: string

	@AutoMap()
	@ApiProperty()
	district: string

	@AutoMap()
	@ApiProperty()
	city: string

	@AutoMap()
	@ApiProperty()
	state: string

	@AutoMap()
	@ApiProperty()
	country: string

	@AutoMap()
	@ApiProperty()
	latitude: string

	@AutoMap()
	@ApiProperty()
	longitude: string

	@AutoMap()
	@ApiProperty()
	openTime: string

	@AutoMap()
	@ApiProperty()
	closeTime: string

	@AutoMap()
	@ApiProperty()
	active: boolean
}
