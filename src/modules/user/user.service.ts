import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common'
import { AutoMapper, InjectMapper } from 'nestjsx-automapper'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import config from '../../config'
import { LoginUserDto } from './dto/login-user.dto'
import { User } from './entities/user.entity'
import { UserCredentialVM } from './viewmodels/user.credential.viewmodel'
import { UserVM } from './viewmodels/user.viewmodel'
import { ChangeUserPasswordDto } from './dto/change-user-password.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
		@InjectMapper() private readonly mapper: AutoMapper
	) {}

	async login(loginUserDto: LoginUserDto): Promise<UserCredentialVM> {
		const user: User = await this.userRepository.findOne(
			{
				userName: loginUserDto.userName,
				companyId: loginUserDto.companyId,
			},
			{
				relations: ['userRoles', 'userRoles.role', 'profile'],
			}
		)

		if (!user || !user.id)
			throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)

		const userCredVm: UserCredentialVM = new UserCredentialVM()

		if (bcrypt.compareSync(loginUserDto.password, user.password)) {
			userCredVm.token = jwt.sign(
				{
					id: user.id,
					userName: user.userName,
					email: user.email,
					master: user.master,
					name: user.fullName,
					companyId: user.companyId,
				},
				config.security.jwtSecret,
				{
					expiresIn: '12h',
				}
			)
			userCredVm.userName = user.fullName
		} else return null

		return userCredVm
	}

	async findById(id: string): Promise<UserVM> {
		const results = await this.userRepository.findOne(
			{ id },
			{
				relations: ['userRoles', 'userRoles.role', 'profile'],
			}
		)
		return this.mapper.map(results, UserVM, User)
	}

	async updatePassword(
		id: string,
		passwordDto: ChangeUserPasswordDto
	): Promise<any> {
		const user: User = await this.userRepository.findOne({
			id: id,
			email: passwordDto.email,
		})

		if (!user || !user.id) {
			return {
				status: 402,
				description: `Invalid credentials`,
			}
		} else {
			if (bcrypt.compareSync(passwordDto.password, user.password)) {
				const salt = bcrypt.genSaltSync(10)
				const newPassword = bcrypt.hashSync(passwordDto.newPassword, salt)
				await this.userRepository.query(`
      UPDATE public.user SET password = '${newPassword}', salt = '${salt}', 
      updated_at = current_timestamp
      WHERE id='${id}';`)

				return {
					status: 200,
					description: `Password updated with success`,
				}
			} else {
				return {
					status: 401,
					description: `Invalid Password`,
				}
			}
		}
	}

	async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
		const currentUser: User = await this.userRepository.findOne({
			id: id,
		})

		if (!currentUser?.id) {
			return {
				status: 400,
				description: `User do not exists.`,
			}
		} else {
			await this.userRepository.query(`
      UPDATE public.user
      SET
      first_name='${updateUserDto.firstName}',
      last_name='${updateUserDto.lastName}',
      full_name='${updateUserDto.firstName} ${updateUserDto.lastName}',
      phone_number='${updateUserDto.phoneNumber}',
      updated_at=current_timestamp,
      WHERE id = '${id}';
      `)
			return {
				status: 200,
				description: `Updated with success.`,
			}
		}
	}
}
