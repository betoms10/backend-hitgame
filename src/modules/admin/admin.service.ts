import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { AutoMapper, InjectMapper } from 'nestjsx-automapper'
import { In, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Profile } from './entities/profile.entity'
import { Role } from './entities/role.entity'
import { UserRole } from './entities/user-role.entity'
import { User } from '../user/entities/user.entity'
import { ProfileVM } from '../user/viewmodels/profile.viewmodel'
import { CreateProfileDto } from './dto/create-profile.dto'
import { CreateMenuDto } from './dto/create-menu.dto'
import { Menu } from './entities/menu.entity'
import { MenuVM } from './viewmodels/menu.viewmodels'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UserVM } from '../user/viewmodels/user.viewmodel'
import { CreateUserVM } from '../user/viewmodels/create-user.viewmodel'
import { RoleVM } from '../user/viewmodels/role.viewmodel'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Injectable()
export class AdminService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
		@Inject('ROLE_REPOSITORY')
		private roleRepository: Repository<Role>,
		@Inject('PROFILE_REPOSITORY')
		private profileRepository: Repository<Profile>,
		@Inject('MENU_REPOSITORY')
		private menuRepository: Repository<Menu>,
		@Inject('USER_ROLE_REPOSITORY')
		private userRoleRepository: Repository<UserRole>,
		@InjectMapper() private readonly mapper: AutoMapper
	) {}

	async createMenu(createMenuDto: CreateMenuDto): Promise<MenuVM> {
		const newMenu: Menu = this.mapper.map(createMenuDto, Menu, CreateMenuDto)

		delete newMenu.id
		delete newMenu.createdAt
		delete newMenu.updatedAt

		const menu = await this.menuRepository.save(newMenu)

		return this.mapper.map(menu, MenuVM, Menu)
	}

	async deleteUser(id: string): Promise<any> {
		await this.userRepository.query(`
    DELETE FROM public.user_role WHERE user_id = '${id}';
	  DELETE FROM public.user WHERE id = '${id}';`)
		return {
			status: 200,
			description: `User with id: ${id} was deleted.`,
		}
	}

	async updateUser(
		companyId: string,
		updateUserDto: UpdateUserDto
	): Promise<any> {
		const currentUser: User = await this.userRepository.findOne({
			id: updateUserDto.id,
		})
		if (!currentUser?.id) {
			return {
				status: 400,
				description: `User do not exists.`,
			}
		} else {
			const userRoles: UserRole[] = new Array<UserRole>()
			let roleInsert = ''
			if (updateUserDto?.roles.length > 0) {
				const roles: Role[] = await this.roleRepository.find({
					role: In(updateUserDto.roles),
				})

				roles.forEach((x) => {
					roleInsert =
						roleInsert +
						"INSERT INTO public.user_role(user_id, role_id, active, created_at, updated_at) VALUES ('" +
						updateUserDto.id +
						"','" +
						x.id +
						"', 'true', current_timestamp, current_timestamp);"
					const userRole: UserRole = {
						userId: updateUserDto.id,
						roleId: x.id,
					}
					userRoles.push(userRole)
				})
			}

			await this.userRepository.query(`
      UPDATE public.user
      SET company_id='${companyId}', 
      profile_id='${updateUserDto.profileId}', 
      first_name='${updateUserDto.firstName}', 
      last_name='${updateUserDto.lastName}', 
      full_name='${updateUserDto.firstName} ${updateUserDto.lastName}', 
      phone_number='${updateUserDto.phoneNumber}', 
      department='${updateUserDto.department}', 
      email='${updateUserDto.email}', 
      user_name='${updateUserDto.userName}', 
      theme='${updateUserDto.theme}', 
      timezone='${updateUserDto.timezone}', 
      active='${updateUserDto.active}',
      updated_at=current_timestamp, 
      lang='${updateUserDto.lang}'
      WHERE id = '${updateUserDto.id}';
      DELETE FROM public.user_role WHERE user_id = '${updateUserDto.id}';
      ${roleInsert}
      `)

			return {
				status: 200,
				description: `Updated with success.`,
			}
		}
	}

	async findAllUsers(companyId): Promise<UserVM[]> {
		const results = await this.userRepository.find({
			where: {
				companyId: companyId,
			},
			relations: ['userRoles', 'userRoles.role', 'profile'],
		})

		return this.mapper.mapArray(results, UserVM, User)
	}

	async createUser(
		companyId: string,
		createUserDto: CreateUserDto
	): Promise<any> {
		createUserDto.companyId = companyId
		const newUser: User = await this.mapper.map<User>(
			createUserDto,
			User,
			CreateUserDto
		)

		const currentUser: User = await this.userRepository.query(`
    SELECT id
	  FROM public.user
    WHERE (email = '${createUserDto.email}' OR user_name = '${createUserDto.userName}')
    AND company_id = '${companyId}';
    `)

		if (currentUser[0]?.id) {
			return {
				status: 400,
				description: `User already exists.`,
			}
		} else {
			const salt = bcrypt.genSaltSync(10)
			newUser.password = bcrypt.hashSync(createUserDto.password, salt)
			newUser.salt = salt
			newUser.fullName = `${createUserDto.firstName} ${createUserDto.lastName}`
			delete newUser.id
			delete newUser.createdAt

			const user = await this.userRepository.save(newUser)

			if (createUserDto?.roles.length > 0) {
				const roles: Role[] = await this.roleRepository.find({
					role: In(createUserDto.roles),
				})

				const userRoles: UserRole[] = new Array<UserRole>()

				roles.forEach((role) => {
					const userRole: UserRole = {
						userId: user.id,
						roleId: role.id,
					}
					userRoles.push(userRole)
				})

				user.userRoles = await this.userRoleRepository.save(userRoles)
			}

			const createUserVm: CreateUserVM = this.mapper.map(
				user,
				CreateUserVM,
				User
			)

			return createUserVm
		}
	}

	async findAllRoles(): Promise<RoleVM[]> {
		const result = await this.roleRepository.find({
			relations: ['userRoles'],
		})
		return this.mapper.mapArray(result, RoleVM, Role)
	}

	async findAllProfiles(companyId: string): Promise<ProfileVM[]> {
		const result = await this.profileRepository.query(`
    SELECT id, name as profile, status, menu, created_at as createdAt 
    FROM public.profile 
    WHERE name != 'Master' and company_id = '${companyId}';`)
		return result
	}

	async findProfileById(id: string): Promise<ProfileVM> {
		const result = await this.profileRepository.query(`
    SELECT id, name as profile, status, menu, created_at as createdAt FROM public.profile
    WHERE id = '${id}';`)
		return result
	}

	async findAllMenus(): Promise<MenuVM[]> {
		const result: Menu[] = await this.menuRepository.find({
			relations: ['subMenus'],
		})
		return this.mapper.mapArray(result, MenuVM, Menu)
	}

	async findUserById(id: string): Promise<UserVM> {
		const results = await this.userRepository.findOne(
			{ id },
			{
				relations: ['userRoles', 'userRoles.role', 'profile'],
			}
		)

		return this.mapper.map(results, UserVM, User)
	}

	async updateProfile(updateProfileDto: UpdateProfileDto): Promise<any> {
		if (!updateProfileDto.id) {
			throw new HttpException(
				'Profile doesnt exists',
				HttpStatus.UNPROCESSABLE_ENTITY
			)
		} else {
			const menu = JSON.stringify(updateProfileDto.menu)
			await this.profileRepository.query(`
    UPDATE profile 
    SET name = '${updateProfileDto.profile}',
    status = ${updateProfileDto.status},
    updated_at = current_timestamp,
    menu = '${menu}'
    WHERE id = '${updateProfileDto.id}';`)
		}

		return {
			status: 200,
			description: `{Profile with id: '${updateProfileDto.id}' was updated}`,
		}
	}

	async createProfile(
		companyId: string,
		createProfileDto: CreateProfileDto
	): Promise<any> {
		const currentProfile = await this.profileRepository.findOne({
			profile: createProfileDto.profile,
			companyId: companyId,
		})

		if (currentProfile?.id)
			throw new HttpException(
				'Profile already exists',
				HttpStatus.UNPROCESSABLE_ENTITY
			)

		const menu = JSON.stringify(createProfileDto.menu)

		await this.profileRepository.query(`
    		INSERT INTO profile(status, name, menu, company_id, created_at, updated_at) 
    		VALUES ('${createProfileDto.status}', '${createProfileDto.profile}',
				'${menu}','${companyId}', current_timestamp, 
				current_timestamp);
				`)

		return {
			status: 200,
			description: `Profile created with sucess!`,
		}
	}

	async deleteMenu(id: string): Promise<string> {
		await this.menuRepository.delete({ id })
		return `Menu with id: ${id} was deleted`
	}
}
