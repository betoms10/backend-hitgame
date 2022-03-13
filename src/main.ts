import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as helmet from 'helmet'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import appConfig from './config'
import { json, urlencoded } from 'express'
//  ['error', 'warn']
async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: true,
		cors: {
			origin: '*',
			allowedHeaders: '*',
			methods: '*',
			credentials: true,
		},
	})

	app.useStaticAssets(join(__dirname, '..', 'public', 'web'))
	app.setViewEngine('html')

	app.useGlobalPipes(new ValidationPipe())
	app.setGlobalPrefix('v1')
	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ extended: true, limit: '50mb' }))
	app.use(cookieParser())
	// app.use(helmet())

	const options = new DocumentBuilder()
		.setTitle('Hit-Game Movies')
		.setDescription(
			'Teste para a empresa HitGame - gerenciamento de filmes e sessões'
		)
		.setVersion('1.0')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('v1/docs', app, document)

	// app.register(helmet, {
	//   contentSecurityPolicy: {
	//     directives: {
	//       defaultSrc: [`'self'`],
	//       styleSrc: [`'self'`, `'unsafe-inline'`],
	//       imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
	//       scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
	//     }
	//   }
	// });
	// app.register(fastifyCookie);
	// app.register(fastifyCsrf);
	await app.listen(appConfig.server.serverPort, appConfig.server.serverHost)
}

bootstrap()
