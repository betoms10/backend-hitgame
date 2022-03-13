import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../common/database/database.module'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'
import { moviesProviders } from './providers/movies.provider'

import './profile/movies.profile'
@Module({
	imports: [DatabaseModule],
	controllers: [MoviesController],
	providers: [MoviesService, ...moviesProviders],
})
export class MoviesModule {}
