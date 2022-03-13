import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class UpdateMovieTheaterDto {
	@AutoMap()
	@ApiProperty()
	id: string

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
}
