import { Module } from '@nestjs/common'
import { DatabaseModule } from './common/database/database.module'
import { AutomapperModule } from 'nestjsx-automapper'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { MoviesModule } from './modules/movies/movies.module'
import { MovieTheaterModule } from './modules/movie-theater/movie-theater.module'

@Module({
	imports: [
		AutomapperModule.withMapper(),
		DatabaseModule,
		MoviesModule,
		MovieTheaterModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public', 'web'),
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
