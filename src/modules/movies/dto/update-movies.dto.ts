import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class UpdateMoviesDto {
	@AutoMap()
	@ApiProperty()
	id: string

	@AutoMap()
	@ApiProperty()
	name: string

	@AutoMap()
	@ApiProperty()
	genre: string

	@AutoMap()
	@ApiProperty()
	duration: number

	@AutoMap()
	@ApiProperty()
	classification: number

	@AutoMap()
	@ApiProperty()
	release: Date

	@AutoMap()
	@ApiProperty()
	synopsis: string
}
