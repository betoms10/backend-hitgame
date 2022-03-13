import { AutoMap } from 'nestjsx-automapper'
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToMany,
	ManyToOne,
} from 'typeorm'
import { Company } from '../../company/entities/company.entity'
import { UserRole } from '../../admin/entities/user-role.entity'
import { Profile } from '../../admin/entities/profile.entity'

@Entity()
export class User {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id?: string

	@AutoMap()
	@Column({ nullable: false })
	companyId?: string

	@AutoMap()
	@Column({ nullable: false })
	profileId?: string

	@AutoMap()
	@Column()
	firstName?: string

	@AutoMap()
	@Column({ nullable: false })
	lastName?: string

	@AutoMap()
	@Column()
	fullName?: string

	@AutoMap()
	@Column({ nullable: true })
	phoneNumber?: string

	@AutoMap()
	@Column({ nullable: true })
	department?: string

	@AutoMap()
	@Column({ nullable: false })
	email: string

	@AutoMap()
	@Column({ nullable: false })
	userName: string

	@Column({ nullable: false })
	password?: string

	@Column({ nullable: false })
	salt?: string

	@Column({ nullable: true })
	@AutoMap()
	lang?: string

	@AutoMap()
	@Column({ nullable: true })
	theme?: string

	@Column({ default: true })
	active?: boolean

	@AutoMap()
	@Column({ nullable: true })
	timezone?: string

	@AutoMap()
	@Column({ default: false, nullable: true })
	master?: boolean

	@AutoMap()
	@Column({ type: 'bytea', nullable: true })
	avatar?: Buffer

	@AutoMap()
	@Column({ nullable: false, default: new Date() })
	createdAt?: Date

	@AutoMap()
	@Column({ nullable: true })
	updatedAt?: Date

	@OneToMany(() => UserRole, (userRole) => userRole.user, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
	userRoles?: UserRole[]

	@AutoMap()
	@ManyToOne(() => Profile, (profile) => profile.users)
	@JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
	profile?: Profile

	@AutoMap()
	@ManyToOne(() => Company, (company) => company.users)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company?: Company
}
