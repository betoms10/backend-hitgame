import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class SubMenuDto {
	@AutoMap()
	@ApiProperty()
	title?: string

	@AutoMap()
	@ApiProperty()
	bullet?: string

	@AutoMap()
	@ApiProperty()
	page?: string
}

export class CreateMenuDto {
	@AutoMap()
	@ApiProperty()
	title: string
	@AutoMap()
	@ApiProperty()
	svg: string
	@AutoMap()
	@ApiProperty()
	bullet: string
	@AutoMap()
	@ApiProperty()
	page: string
	@AutoMap()
	@ApiProperty()
	section: string
	@AutoMap()
	@ApiProperty({ type: SubMenuDto })
	subMenus?: SubMenuDto[]
}
