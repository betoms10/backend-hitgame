import {
	Controller,
	Get,
	Post,
	Body,
	UseGuards,
	UploadedFile,
	UseInterceptors,
	Param,
	Res,
	Query,
	Req,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { Roles } from '../../common/security/decorators/role.decorator'
import { Role } from '../../common/security/enums/role.enum'
import { AuthGuard } from '../../common/security/guards/auth.guard'
import { RolesGuard } from '../../common/security/guards/roles.guard'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { CompanyVM } from './viewmodels/company.viewmodel'
@ApiTags('Companies')
@Controller('company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@Post()
	@ApiResponse({
		status: 201,
		type: CompanyVM,
		description: 'Register a new company',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	create(
		@Body() createCompanyDto: CreateCompanyDto,
		@Req() req: any
	): Promise<CompanyVM> {
		const userId = req.user.id
		return this.companyService.create(createCompanyDto, userId)
	}

	@Get()
	@ApiResponse({
		status: 201,
		type: CompanyVM,
		isArray: true,
		description: 'List all companies',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	findAll(@Req() req: any): Promise<CompanyVM[]> {
		const userId = req.user.id
		return this.companyService.findAll(userId)
	}

	@Get('domain')
	@ApiResponse({
		status: 201,
		isArray: true,
		description: 'Return domain id',
	})
	findDomain(@Query('domain') company: string): Promise<string> {
		return this.companyService.findDomain(company)
	}

	@Post(':id/avatar')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './avatars',
				filename: (req, file, cb) => {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('')
					return cb(null, `${randomName}${extname(file.originalname)}`)
				},
			}),
		})
	)
	uploadAvatar(@Param('id') id, @UploadedFile() file) {
		this.companyService.setAvatar(id, `${file.path}`)
	}

	@Get('avatars/:fileId')
	async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
		const options = {
			root: 'avatars',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true,
			},
		}
		res.sendFile(fileId, options)
	}
}
