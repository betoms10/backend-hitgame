import { Controller, Get, Post, Body, Req } from '@nestjs/common'
import { LocationService } from './location.service'
import { CreateLocationDto } from './dto/create-location.dto'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '../../common/security/decorators/role.decorator'
import { UseGuards } from '@nestjs/common'
import { Role } from '../../common/security/enums/role.enum'
import { AuthGuard } from '../../common/security/guards/auth.guard'
import { RolesGuard } from '../../common/security/guards/roles.guard'

@Controller('location')
@ApiTags('Locations')
export class LocationController {
	constructor(private readonly locationService: LocationService) {}

	@Post()
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	create(@Body() createLocationDto: CreateLocationDto, @Req() req: any) {
		createLocationDto.companyId = req.companyId
		return this.locationService.create(createLocationDto)
	}

	@Get()
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin, Role.User])
	findAllActive(@Req() req: any) {
		const { companyId } = req
		return this.locationService.findAllActive(companyId)
	}

	@Get('/all')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin, Role.User])
	findAll(@Req() req: any) {
		const { companyId } = req
		return this.locationService.findAll(companyId)
	}
}
