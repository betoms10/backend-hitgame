import { Connection } from 'typeorm'
import { Company } from '../entities/company.entity'

export const companyProviders = [
	{
		provide: 'COMPANY_REPOSITORY',
		useFactory: (connection: Connection) => connection.getRepository(Company),
		inject: ['DATABASE_CONNECTION'],
	},
]
