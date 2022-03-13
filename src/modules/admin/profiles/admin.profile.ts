import {
	AutoMapper,
	ignore,
	mapFrom,
	Profile,
	ProfileBase,
} from 'nestjsx-automapper'
import { User } from '../../user/entities/user.entity'
import { CreateUserVM } from '../../user/viewmodels/create-user.viewmodel'
import { RoleVM } from '../../user/viewmodels/role.viewmodel'
import { UserRoleVM } from '../../user/viewmodels/user-role.vielmodel'
import { ProfileVM } from '../../user/viewmodels/profile.viewmodel'
import { CreateMenuDto } from '../dto/create-menu.dto'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserRoleDto } from '../dto/update-user-role.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { Menu } from '../entities/menu.entity'
import { Profile as ProfileEntity } from '../entities/profile.entity'
import { Role } from '../entities/role.entity'
import { SubMenu } from '../entities/sub-menu.entity'
import { UserRole } from '../entities/user-role.entity'
import { MenuVM, SubMenuVM } from '../viewmodels/menu.viewmodels'

@Profile()
export class AdminProfileextends extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super()

		mapper
			.createMap(CreateUserDto, User)
			.forMember((dest) => dest.id, ignore())
			.forMember((dest) => dest.userRoles, ignore())
			.forMember((dest) => dest.createdAt, ignore())
			.forMember((dest) => dest.updatedAt, ignore())
			.forMember((dest) => dest.company, ignore())
			.forMember((dest) => dest.profile, ignore())
			.forMember((dest) => dest.fullName, ignore())

		mapper
			.createMap(UpdateUserDto, User)
			.forMember((dest) => dest.userRoles, ignore())
			.forMember((dest) => dest.createdAt, ignore())
			.forMember((dest) => dest.updatedAt, ignore())
			.forMember((dest) => dest.company, ignore())
			.forMember((dest) => dest.profileId, ignore())
			.forMember((dest) => dest.profile, ignore())
			.forMember((dest) => dest.fullName, ignore())

		mapper
			.createMap(User, CreateUserVM)
			.forMember(
				(dest) => dest.roles,
				mapFrom((src) => src.userRoles)
			)
			.reverseMap()

		mapper.createMap(ProfileEntity, ProfileVM)

		mapper.createMap(SubMenu, SubMenuVM)

		mapper
			.createMap(CreateMenuDto, Menu)
			.forMember((dest) => dest.id, ignore())
			.forMember((dest) => dest.createdAt, ignore())
			.forMember((dest) => dest.updatedAt, ignore())

			.forMember(
				(dest) => dest.subMenus,
				mapFrom((src) => src.subMenus)
			)

		mapper.createMap(Menu, MenuVM).forMember(
			(dest) => dest.subMenus,
			mapFrom((src) => src.subMenus)
		)

		mapper.createMap(UpdateUserRoleDto, UserRole)
		mapper.createMap(UserRole, UserRoleVM).reverseMap()
		mapper.createMap(Role, RoleVM).reverseMap()
	}
}
