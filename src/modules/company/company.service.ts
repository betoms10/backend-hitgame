import { Inject, Injectable } from '@nestjs/common'
import { AutoMapper, InjectMapper } from 'nestjsx-automapper'
import { Repository } from 'typeorm'
import { CreateCompanyDto } from './dto/create-company.dto'
import { Company } from './entities/company.entity'

@Injectable()
export class CompanyService {
	constructor(
		@Inject('COMPANY_REPOSITORY')
		private companyRepository: Repository<Company>,
		@InjectMapper() private readonly mapper: AutoMapper
	) {}

	async create(
		createCompanyDto: CreateCompanyDto,
		userId: string
	): Promise<any> {
		const company = await this.companyRepository.query(`
		SELECT * FROM company WHERE name = '${createCompanyDto.name}';
		`)
		if (company.length > 0) {
			return {
				statusCode: 401,
				description: 'Company already exists',
			}
		} else {
			await this.companyRepository.query(`
    	INSERT INTO 
			company(name, legal_name, document, status_id, subdomain, created_at, updated_at)
    	VALUES  
			('${createCompanyDto.name}',
			'${createCompanyDto.legalName}',
			'${createCompanyDto.document}',
			'${createCompanyDto.statusId}',
			'${createCompanyDto.subdomain}',
			current_timestamp,
			current_timestamp);`)

			const newCompany = await this.companyRepository.query(`
			SELECT * FROM company WHERE name = '${createCompanyDto.name}';
			`)

			await this.companyRepository.query(`
			INSERT INTO user_company(user_id, company_id, active, created_at, updated_at) 
			VALUES
			('${userId}', 
			'${newCompany[0].id}', 
			'true', 
			current_timestamp, 
			current_timestamp);`)

			return {
				statusCode: 200,
				description: `Company created with success.`,
				data: newCompany,
			}
		}
	}

	async findAll(userId) {
		const companies = await this.companyRepository.query(`
		SELECT c.id, 
			c.name, 
			c.legal_name, 
			c.document, 
			c.logo, 
			c.created_at, 
			c.updated_at, 
			c.subdomain,
			s.name AS status, 
		FROM public.user_company AS u 
			JOIN company AS c ON c.id = u.company_id
			JOIN status AS s ON c.status_id = s.id
  		WHERE u.user_id = '${userId}';`)
		return companies
	}

	async findDomain(company: string) {
		const companies = await this.companyRepository.query(`
    SELECT id, logo FROM company 
    WHERE subdomain = '${company}';`)
		return companies
	}

	async setAvatar(companyId: string, avatarUrl: string) {
		this.companyRepository.update(companyId, { logo: avatarUrl })
	}
}
