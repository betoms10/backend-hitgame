import { Module } from '@nestjs/common'
import { DatabaseModule } from './common/database/database.module'
import { UserModule } from './modules/user/user.module'
import { AutomapperModule } from 'nestjsx-automapper'
import { SecurityModule } from './common/security/security.module'
import { AdminModule } from './modules/admin/admin.module'
import { MoviesModule } from './modules/movies/movies.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
	imports: [
		AutomapperModule.withMapper(),
		DatabaseModule,
		UserModule,
		SecurityModule,
		AdminModule,
		MoviesModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public', 'web'),
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
