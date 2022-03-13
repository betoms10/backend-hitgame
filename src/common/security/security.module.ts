import { CacheModule, Module } from '@nestjs/common'
import { userProviders } from '../../modules/user/providers/user.provider'
import { DatabaseModule } from '../database/database.module'
import { securityProviders } from './providers/security.provider'
import { SecurityService } from './services/security.service'

@Module({
	imports: [CacheModule.register(), DatabaseModule],
	providers: [...securityProviders, ...userProviders, SecurityService],
	exports: [...securityProviders, ...userProviders, SecurityService],
})
export class SecurityModule {}
