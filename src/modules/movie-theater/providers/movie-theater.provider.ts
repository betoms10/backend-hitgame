import { Connection } from 'typeorm'
import { MovieTheater } from '../entities/movie-theater.entity'

export const movieTheaterProviders = [
	{
		provide: 'MOVIETHEATER_REPOSITORY',
		useFactory: (connection: Connection) =>
			connection.getRepository(MovieTheater),
		inject: ['DATABASE_CONNECTION'],
	},
]
