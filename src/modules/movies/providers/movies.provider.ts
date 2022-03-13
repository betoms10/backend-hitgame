import { Connection } from 'typeorm'
import { Movies } from '../entities/movies.entity'

export const moviesProviders = [
	{
		provide: 'MOVIES_REPOSITORY',
		useFactory: (connection: Connection) => connection.getRepository(Movies),
		inject: ['DATABASE_CONNECTION'],
	},
]
