import { AutoMapper, mapFrom, Profile, ProfileBase } from 'nestjsx-automapper'
import { User } from '../entities/user.entity'
import { UserVM } from '../viewmodels/user.viewmodel'

@Profile()
export class UserProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super()

		mapper
			.createMap(User, UserVM)
			.forMember(
				(dest) => dest.roles,
				mapFrom((src) => src.userRoles.map((roleSrc) => roleSrc.role))
			)
			.forMember(
				(dest) => dest.profile,
				mapFrom((src) => src.profile)
			)
			.forMember(
				(dest) => dest.active,
				mapFrom((src) => src.active)
			)
	}
}
