import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Roles } from '../../common/security/decorators/role.decorator'
import { Role } from '../../common/security/enums/role.enum'
import { AuthGuard } from '../../common/security/guards/auth.guard'
import { RolesGuard } from '../../common/security/guards/roles.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserVM } from '../user/viewmodels/create-user.viewmodel'
import { ProfileVM } from '../user/viewmodels/profile.viewmodel'
import { RoleVM } from '../user/viewmodels/role.viewmodel'
import { UserVM } from '../user/viewmodels/user.viewmodel'
import { AdminService } from './admin.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { CreateProfileDto } from './dto/create-profile.dto'
import { MenuVM } from './viewmodels/menu.viewmodels'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('/roles')
	@ApiResponse({
		status: 200,
		type: RoleVM,
		isArray: true,
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.User, Role.Admin])
	findRoles(): Promise<RoleVM[]> {
		return this.adminService.findAllRoles()
	}

	@Get('/user')
	@ApiResponse({
		status: 200,
		type: UserVM,
		isArray: true,
		description: 'Return all users',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	findAll(@Req() req: any): Promise<UserVM[]> {
		const { companyId } = req
		return this.adminService.findAllUsers(companyId)
	}

	@Get('/user/:id')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	findOne(@Param('id') id: string): Promise<UserVM> {
		return this.adminService.findUserById(id)
	}

	@Put('/user/:id')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto
	): Promise<any> {
		return this.adminService.updateUser(updateUserDto.companyId, updateUserDto)
	}

	@Post('profile')
	@ApiResponse({
		status: 200,
		type: ProfileVM,
		description: 'Creates a new profile',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	createProfile(
		@Body() createProfileDto: CreateProfileDto,
		@Req() req: any
	): Promise<ProfileVM> {
		const { companyId } = req
		return this.adminService.createProfile(companyId, createProfileDto)
	}

	@Put('profile')
	@ApiResponse({
		status: 200,
		type: ProfileVM,
		description: 'Updates profile',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	updateProfile(@Body() updateProfileDto: UpdateProfileDto): Promise<any> {
		return this.adminService.updateProfile(updateProfileDto)
	}

	@Get('profile')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	@ApiResponse({
		status: 200,
		type: ProfileVM,
		isArray: true,
		description: 'List all profiles',
	})
	listProfile(@Req() req: any): Promise<ProfileVM[]> {
		const { companyId } = req
		return this.adminService.findAllProfiles(companyId)
	}

	@Get('profile/:id')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	@ApiResponse({
		status: 200,
		type: ProfileVM,
		isArray: true,
		description: 'Get a especific profile',
	})
	listProfileById(@Param('id') id: string): Promise<ProfileVM> {
		return this.adminService.findProfileById(id)
	}

	@Post('/user')
	@ApiResponse({
		status: 200,
		type: CreateUserVM,
		description: 'Resgister an user',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	async create(
		@Body() createUserDto: CreateUserDto,
		@Req() req: any
	): Promise<any> {
		const { companyId } = req
		return await this.adminService.createUser(companyId, createUserDto)
	}

	@Delete('/user/:id')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	remove(@Param('id') id: string, @Req() req: any): Promise<string> {
		if (req.user.id === id)
			throw new HttpException('User cannot self delete', HttpStatus.BAD_REQUEST)
		return this.adminService.deleteUser(id)
	}

	@Post('menu')
	@ApiResponse({
		status: 200,
		type: MenuVM,
		description: 'Creates a new menu item',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	createMenu(@Body() createMenuDto: CreateMenuDto): Promise<MenuVM> {
		return this.adminService.createMenu(createMenuDto)
	}

	@Delete('menu/:id')
	@ApiResponse({
		status: 200,
		type: MenuVM,
		description: 'Deletes a menu item',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	deleteMenu(@Param('id') id): Promise<string> {
		return this.adminService.deleteMenu(id)
	}

	@Get('menu')
	@ApiResponse({
		status: 200,
		type: MenuVM,
		isArray: true,
		description: 'List all menu itens',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	listMenu(): Promise<MenuVM[]> {
		return this.adminService.findAllMenus()
	}

	@Get('/company-user/:id')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	findUserByCompany(@Param('id') id: string): Promise<any> {
		return this.adminService.findAllUsers(id)
	}

	@Post('/company-user/:id')
	@ApiResponse({
		status: 200,
		type: CreateUserVM,
		description: 'Resgister an user',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	async createUser(
		@Param('id') id: string,
		@Body() createUserDto: CreateUserDto
	): Promise<any> {
		return await this.adminService.createUser(id, createUserDto)
	}

	@Get('company-profile/:id')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	@ApiResponse({
		status: 200,
		type: ProfileVM,
		isArray: true,
		description: 'List all profiles',
	})
	listCompanyProfile(@Param('id') companyId: string): Promise<ProfileVM[]> {
		return this.adminService.findAllProfiles(companyId)
	}

	@Post('company-profile')
	@ApiResponse({
		status: 200,
		type: ProfileVM,
		description: 'Creates a new profile',
	})
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	createProfileCompany(
		@Body() createProfileDto: CreateProfileDto
	): Promise<ProfileVM> {
		return this.adminService.createProfile(
			createProfileDto.company,
			createProfileDto
		)
	}

	@Put('/company-user/:id')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	updateUser(
		@Param('id') companyId: string,
		@Body() updateUserDto: UpdateUserDto
	): Promise<any> {
		return this.adminService.updateUser(companyId, updateUserDto)
	}
}
