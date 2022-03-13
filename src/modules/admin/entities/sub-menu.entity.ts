import { AutoMap } from 'nestjsx-automapper'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Menu } from './menu.entity'

@Entity()
export class SubMenu {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id?: string
	@AutoMap()
	@Column({ nullable: false })
	menuId?: string

	@AutoMap()
	@Column({ nullable: false })
	title?: string

	@AutoMap()
	@Column({ nullable: false })
	bullet?: string

	@AutoMap()
	@Column({ nullable: false })
	page?: string

	@AutoMap()
	@Column({ type: 'timestamptz', nullable: false, default: new Date() })
	createdAt?: Date

	@AutoMap()
	@Column({ type: 'timestamptz', nullable: true })
	updatedAt?: Date

	@ManyToOne(() => Menu, (menu) => menu.subMenus)
	menu: Menu
}
