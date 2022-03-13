import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Status {
	@PrimaryGeneratedColumn('uuid')
	id?: string

	@Column()
	name?: string

	@Column()
	type?: string

	@Column({ type: 'timestamptz', nullable: false, default: new Date() })
	createdAt?: Date

	@Column({ type: 'timestamptz', nullable: true })
	updatedAt?: Date
}
