import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken'
import { SecurityService } from '../services/security.service'
import config from '../../../config'
import { ICredential } from '../interfaces/credential.interface'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly securityService: SecurityService) {}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const {
			headers: { authorization },
		} = request

		const token: string = authorization?.split(' ')[1]
		const credentials: ICredential | any = jwt.verify(
			token,
			config.security.jwtSecret,
			(err, decoded) => {
				if (err) {
					switch (err.name) {
						case 'TokenExpiredError':
							throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED)
						default:
							throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
					}
				}
				if (decoded) return decoded
			}
		)
		if (!credentials?.id)
			throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)

		request.id = credentials.id
		request.companyId = credentials.companyId
		if (request.body && request.headers['content-type'] === 'application/json')
			request.body.companyId = credentials.companyId
		return this.validateRequest(credentials, request)
	}

	async validateRequest(credentials: any, request: any): Promise<any> {
		request.user = await this.securityService.getUserById(credentials.id)
		if (request.user) return true
		return false
	}
}
