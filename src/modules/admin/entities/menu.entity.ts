import { AutoMap } from 'nestjsx-automapper'
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { SubMenu } from './sub-menu.entity'

@Entity()
export class Menu {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id?: string

	@AutoMap()
	@Column({ nullable: false })
	title: string

	@AutoMap()
	@Column({ nullable: false })
	svg: string

	@AutoMap()
	@Column({ nullable: false })
	bullet: string

	@AutoMap()
	@Column({ nullable: false })
	page: string

	@AutoMap()
	@Column({ nullable: true })
	section: string

	@AutoMap()
	@Column({ type: 'timestamptz', nullable: false, default: new Date() })
	createdAt?: Date

	@AutoMap()
	@Column({ type: 'timestamptz', nullable: true })
	updatedAt?: Date

	@OneToMany(() => SubMenu, (subMenu) => subMenu.menu, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'id', referencedColumnName: 'menu_id' })
	subMenus: SubMenu[]
}
