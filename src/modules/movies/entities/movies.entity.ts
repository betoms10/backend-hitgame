import { AutoMap } from 'nestjsx-automapper'
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Movies {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@AutoMap()
	@Column({ nullable: false })
	name: string

	@AutoMap()
	@Column({ nullable: false })
	genre: string

	@AutoMap()
	@Column({ nullable: false })
	duration: number

	@AutoMap()
	@Column({ nullable: false })
	classification: number

	@AutoMap()
	@Column({ nullable: false })
	release: Date

	@AutoMap()
	@Column({ nullable: false })
	synopsis: string

	@AutoMap()
	@Column({ nullable: false, default: new Date() })
	createdAt: Date

	@AutoMap()
	@Column({ nullable: true })
	updatedAt: Date
}
