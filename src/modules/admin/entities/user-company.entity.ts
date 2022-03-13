import { AutoMap } from 'nestjsx-automapper'
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm'

import { Company } from '../../company/entities/company.entity'
import { User } from '../../user/entities/user.entity'

@Entity()
@Index(['userId', 'companyId'], { unique: true })
export class UserCompany {
	@AutoMap()
	@PrimaryColumn({ unique: false })
	userId?: string

	@AutoMap()
	@PrimaryColumn({ unique: false })
	companyId?: string

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
	@ManyToOne(() => Company, (company) => company.id)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	company?: Company
}
