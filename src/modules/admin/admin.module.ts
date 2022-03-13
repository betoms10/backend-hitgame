import { CacheModule, Module } from '@nestjs/common'
import { SecurityService } from '../../common/security/services/security.service'
import { DatabaseModule } from '../../common/database/database.module'
import { userProviders } from '../user/providers/user.provider'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

import './profiles/admin.profile'
import { adminProviders } from './providers/admin.provider'

@Module({
	imports: [DatabaseModule, CacheModule.register()],
	controllers: [AdminController],
	providers: [
		AdminService,
		SecurityService,
		...userProviders,
		...adminProviders,
	],
})
export class AdminModule {}
