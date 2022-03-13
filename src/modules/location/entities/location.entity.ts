import { AutoMap } from 'nestjsx-automapper'
import { Company } from 'src/modules/company/entities/company.entity'
import {
	Column,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Location {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id?: string

	@AutoMap()
	@Column({ nullable: true })
	@Index('idx-location-company')
	companyId: string

	@AutoMap()
	@Column({ nullable: false })
	@Index('idx-location-code')
	code: string

	@AutoMap()
	@Column({ nullable: false })
	name: string

	@AutoMap()
	@Column({ nullable: true })
	zipcode: string

	@AutoMap()
	@Column({ nullable: true })
	number: string

	@AutoMap()
	@Column({ nullable: true })
	address: string

	@AutoMap()
	@Column({ nullable: true })
	district: string

	@AutoMap()
	@Column({ nullable: true })
	city: string

	@AutoMap()
	@Column({ nullable: true })
	state: string

	@AutoMap()
	@Column({ nullable: true })
	country: string

	@AutoMap()
	@Column({ nullable: true })
	latitude: string

	@AutoMap()
	@Column({ nullable: true })
	longitude: string

	@AutoMap()
	@Column({ nullable: true, type: 'time' })
	openTime: string

	@AutoMap()
	@Column({ nullable: true, type: 'time' })
	closeTime: string

	@AutoMap()
	@Column({ nullable: false, default: false })
	active: boolean

	@Column({ type: 'timestamptz', nullable: false, default: new Date() })
	createdAt?: Date

	@Column({ type: 'timestamptz', nullable: true })
	updatedAt?: Date

	@ManyToOne(() => Company, (company) => company.location)
	@AutoMap()
	company?: Company
}
