import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Cache } from 'cache-manager'
import { User } from '../../../modules/user/entities/user.entity'

@Injectable()
export class SecurityService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
		@Inject(CACHE_MANAGER) protected readonly cacheManager: Cache
	) {}

	async getUserById(id: string): Promise<User> {
		const userCache: User = (await this.cacheManager.get(id)) as User
		if (userCache) return userCache

		const user: User = await this.userRepository.findOne({
			where: { id },
			relations: ['userRoles', 'userRoles.role'],
		})
		await this.cacheManager.set(id, user, { ttl: 1000 })
		return user
	}
}
