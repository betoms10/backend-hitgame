import {
	Controller,
	Get,
	Post,
	Body,
	HttpStatus,
	HttpException,
	UseGuards,
	Req,
	Put,
	Param,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/common/security/guards/roles.guard'
import { AuthGuard } from '../../common/security/guards/auth.guard'
import { LoginUserDto } from './dto/login-user.dto'

import { UserService } from './user.service'
import { UserCredentialVM } from './viewmodels/user.credential.viewmodel'
import { UserVM } from './viewmodels/user.viewmodel'
import { Roles } from '../../common/security/decorators/role.decorator'
import { Role } from 'src/common/security/enums/role.enum'
import { ChangeUserPasswordDto } from './dto/change-user-password.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('Security')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.User, Role.Admin])
	userInfo(@Req() req): Promise<UserVM> {
		return this.userService.findById(req.user?.id)
	}

	@Post('login')
	@ApiResponse({
		status: 200,
		type: UserCredentialVM,
		description: 'Login an user',
	})
	async login(@Body() loginUserDto: LoginUserDto): Promise<UserCredentialVM> {
		const credentials = await this.userService.login(loginUserDto)
		if (!credentials) {
			throw new HttpException(
				'Wrong username or password',
				HttpStatus.UNAUTHORIZED
			)
		} else return credentials
	}

	@Put('password/:id')
	@ApiResponse({
		status: 200,
		description: 'Update password',
	})
	async updatePassword(
		@Param('id') id: string,
		@Body() changeUserPasswordDto: ChangeUserPasswordDto
	): Promise<any> {
		return await this.userService.updatePassword(id, changeUserPasswordDto)
	}

	@Put('/user/:id')
	@UseGuards(RolesGuard)
	@UseGuards(AuthGuard)
	@Roles([Role.Admin])
	update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto
	): Promise<any> {
		return this.userService.updateUser(id, updateUserDto)
	}
}
