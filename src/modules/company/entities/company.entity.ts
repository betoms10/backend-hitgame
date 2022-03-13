import { AutoMap } from 'nestjsx-automapper'
import { OneToMany } from 'typeorm'
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToMany,
} from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Address } from './address.entity'
import { Location } from 'src/modules/location/entities/location.entity'
@Entity()
export class Company {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id?: string

	@AutoMap()
	@Column({ nullable: false })
	name: string

	@AutoMap()
	@Column({ nullable: false, unique: true })
	legalName: string

	@AutoMap()
	@Column({ nullable: false, unique: true })
	document: string

	@Column({ nullable: true })
	logo: string

	@Column({ type: 'uuid', nullable: true })
	statusId: string

	@Column({ nullable: true })
	subdomain: string

	@Column({ type: 'timestamptz', nullable: false, default: new Date() })
	createdAt?: Date

	@Column({ type: 'timestamptz', nullable: true })
	updatedAt?: Date

	@ManyToMany(() => Address, (address) => address.companies, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'id', referencedColumnName: 'address_id' })
	addresses?: Address[]

	@OneToMany(() => User, (user) => user.company)
	@JoinColumn({ name: 'id', referencedColumnName: 'company_id' })
	users?: User[]

	@OneToMany(() => Location, (location) => location.company)
	@JoinColumn({ name: 'id', referencedColumnName: 'company_id' })
	location?: Location
}
