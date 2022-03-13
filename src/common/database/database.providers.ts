import { createConnection } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies/snake-naming.strategy'
import config from '../../config'

export const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: async () =>
			await createConnection({
				type: 'postgres',
				host: config.database.host,
				port: config.database.port,
				username: config.database.username,
				password: config.database.password,
				database: config.database.dbName,
				entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
				migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
				synchronize: true,
				namingStrategy: new SnakeNamingStrategy(),
			}),
	},
]
