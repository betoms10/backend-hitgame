import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../common/database/database.module'
import { SecurityModule } from '../../common/security/security.module'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'
import { moviesProviders } from './providers/movies.provider'

import './profile/movies.profile'
@Module({
	imports: [DatabaseModule, SecurityModule],
	controllers: [MoviesController],
	providers: [MoviesService, ...moviesProviders],
})
export class MoviesModule {}
