import { Connection } from 'typeorm'
import { Menu } from '../entities/menu.entity'
import { Profile } from '../entities/profile.entity'
import { Role } from '../entities/role.entity'
import { UserCompany } from '../entities/user-company.entity'
import { UserRole } from '../entities/user-role.entity'

export const adminProviders = [
	{
		provide: 'ROLE_REPOSITORY',
		useFactory: (connection: Connection) => connection.getRepository(Role),
		inject: ['DATABASE_CONNECTION'],
	},
	{
		provide: 'PROFILE_REPOSITORY',
		useFactory: (connection: Connection) => connection.getRepository(Profile),
		inject: ['DATABASE_CONNECTION'],
	},
	{
		provide: 'MENU_REPOSITORY',
		useFactory: (connection: Connection) => connection.getRepository(Menu),
		inject: ['DATABASE_CONNECTION'],
	},
	{
		provide: 'USER_ROLE_REPOSITORY',
		useFactory: (connection: Connection) => connection.getRepository(UserRole),
		inject: ['DATABASE_CONNECTION'],
	},
	{
		provide: 'USER_COMPANY_REPOSITORY',
		useFactory: (connection: Connection) =>
			connection.getRepository(UserCompany),
		inject: ['DATABASE_CONNECTION'],
	},
]
