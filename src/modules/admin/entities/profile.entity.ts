import { AutoMap } from 'nestjsx-automapper'
import { User } from 'src/modules/user/entities/user.entity'
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Profile {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id?: string

	@AutoMap()
	@Column({ nullable: true })
	companyId: string

	@AutoMap()
	@Column({ nullable: false, name: 'name' })
	profile?: string

	@AutoMap()
	@Column({ type: 'jsonb', nullable: true })
	menu?: any

	@AutoMap()
	@Column({ nullable: true })
	status?: boolean

	@OneToMany(() => User, (user) => user.profile)
	@JoinColumn({ name: 'id', referencedColumnName: 'profile_id' })
	users?: User[]

	@AutoMap()
	@Column({ type: 'timestamptz', nullable: false, default: new Date() })
	createdAt?: Date

	@AutoMap()
	@Column({ type: 'timestamptz', nullable: true })
	updatedAt?: Date
}
