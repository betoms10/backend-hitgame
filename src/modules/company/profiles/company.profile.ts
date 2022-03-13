import { AutoMapper, ignore, Profile, ProfileBase } from 'nestjsx-automapper'
import { CreateCompanyDto } from '../dto/create-company.dto'
import { Company } from '../entities/company.entity'
import { CompanyVM } from '../viewmodels/company.viewmodel'

@Profile()
export class CompanyProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super()
		mapper
			.createMap(CreateCompanyDto, Company)
			.forMember((dest) => dest.id, ignore())
			.reverseMap()

		mapper.createMap(Company, CompanyVM).reverseMap()
	}
}
