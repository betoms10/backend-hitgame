import { Module } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CompanyController } from './company.controller'
import { companyProviders } from './providers/company.provider'
import { DatabaseModule } from '../../common/database/database.module'
import { SecurityModule } from 'src/common/security/security.module'
import './profiles/company.profile'

@Module({
	imports: [DatabaseModule, SecurityModule],
	controllers: [CompanyController],
	providers: [CompanyService, ...companyProviders],
})
export class CompanyModule {}
