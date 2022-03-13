import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class SubMenuVM {
	@AutoMap()
	@ApiProperty()
	id?: string
	@AutoMap()
	@ApiProperty()
	menuId?: string
	@AutoMap()
	@ApiProperty()
	title?: string
	@AutoMap()
	@ApiProperty()
	bullet?: string
	@AutoMap()
	@ApiProperty()
	page?: string
	@AutoMap()
	createdAt?: Date
	@AutoMap()
	updatedAt?: Date
}

export class MenuVM {
	@AutoMap()
	@ApiProperty()
	id?: string
	@AutoMap()
	@ApiProperty()
	title?: string
	@AutoMap()
	@ApiProperty()
	bullet?: string
	@AutoMap()
	@ApiProperty()
	svg?: string
	@AutoMap()
	@ApiProperty()
	page?: string
	@AutoMap()
	@ApiProperty()
	section?: string
	@AutoMap()
	@ApiProperty({ type: SubMenuVM })
	subMenus?: SubMenuVM[]
	@AutoMap()
	createdAt?: Date
	@AutoMap()
	updatedAt?: Date
}
