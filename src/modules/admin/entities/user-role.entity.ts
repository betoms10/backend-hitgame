import { AutoMap } from 'nestjsx-automapper'
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm'

import { Role } from './role.entity'
import { User } from '../../user/entities/user.entity'

@Entity()
@Index(['userId', 'roleId'], { unique: true })
export class UserRole {
	@AutoMap()
	@PrimaryColumn({ unique: false })
	userId?: string

	@AutoMap()
	@PrimaryColumn({ unique: false })
	roleId?: string

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
	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user?: User

	@AutoMap()
	@ManyToOne(() => Role, (role) => role.id)
	@JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
	role?: Role
}
