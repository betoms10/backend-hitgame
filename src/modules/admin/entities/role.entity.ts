import { AutoMap } from 'nestjsx-automapper'
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { UserRole } from './user-role.entity'

@Entity()
export class Role {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id?: string

	@AutoMap()
	@Column({ name: 'name', unique: true, nullable: false })
	role: string

	@AutoMap()
	@Column({ nullable: true })
	description: string

	@AutoMap()
	@Column({ nullable: false, default: true })
	active?: boolean

	@AutoMap()
	@Column({ type: 'timestamptz', nullable: false, default: new Date() })
	createdAt?: Date

	@AutoMap()
	@Column({ type: 'timestamptz', nullable: true })
	updatedAt?: Date

	@AutoMap()
	@OneToMany(() => UserRole, (userRole) => userRole.role)
	@JoinColumn({ name: 'id', referencedColumnName: 'role_id' })
	userRoles?: UserRole[]
}
