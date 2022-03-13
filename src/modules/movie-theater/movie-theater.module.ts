import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../common/database/database.module'
import { MovieTheaterController } from './movie-theater.controller'
import { MovieTheaterService } from './movie-theater.service'
import { movieTheaterProviders } from './providers/movie-theater.provider'

import './profile/movie-theater.profile'
@Module({
	imports: [DatabaseModule],
	controllers: [MovieTheaterController],
	providers: [MovieTheaterService, ...movieTheaterProviders],
})
export class MovieTheaterModule {}
