import { CacheModule, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { userProviders } from './providers/user.provider'
import { DatabaseModule } from '../../common/database/database.module'
import { SecurityModule } from '../../common/security/security.module'
import { SecurityService } from '../../common/security/services/security.service'

import './profiles/user.profile'
import { adminProviders } from '../admin/providers/admin.provider'

@Module({
  imports: [DatabaseModule, SecurityModule, CacheModule.register()],
  controllers: [UserController],
  providers: [
    UserService,
    SecurityService,
    ...userProviders,
    ...adminProviders,
  ],
})
export class UserModule {}
