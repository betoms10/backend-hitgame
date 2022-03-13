import { Module } from '@nestjs/common'
import { LocationService } from './location.service'
import { LocationController } from './location.controller'
import { locationProviders } from './providers/location.provider'
import { DatabaseModule } from 'src/common/database/database.module'
import { SecurityModule } from 'src/common/security/security.module'
import './profiles/location.profile'

@Module({
	imports: [DatabaseModule, SecurityModule],
	controllers: [LocationController],
	providers: [LocationService, ...locationProviders],
})
export class LocationModule {}
