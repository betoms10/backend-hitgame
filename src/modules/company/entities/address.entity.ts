import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToMany,
} from 'typeorm'
import { Company } from './company.entity'

@Entity()
export class Address {
	@PrimaryGeneratedColumn('uuid')
	id?: string

	@Column({ nullable: false })
	companyId: string

	@Column({ nullable: false })
	country: string

	@Column({ nullable: false })
	state: string

	@Column({ nullable: false })
	city: string

	@Column({ nullable: false })
	zipcode: string

	@Column({ nullable: false })
	address1: string

	@Column({ nullable: true })
	address2?: string

	@Column({ nullable: true })
	latitude?: string

	@Column({ nullable: true })
	longitude?: string

	@OneToMany(() => Company, (company) => company.addresses)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
	companies?: Company[]
}
