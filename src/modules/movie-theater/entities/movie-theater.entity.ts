import { AutoMap } from 'nestjsx-automapper'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MovieTheater {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

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
	@Column({ nullable: false, default: new Date() })
	createdAt: Date

	@AutoMap()
	@Column({ nullable: true })
	updatedAt: Date
}
