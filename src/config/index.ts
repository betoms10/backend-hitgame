// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-safe').config()
const {
	DB_HOST,
	DB_NAME,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	JWT_SECRET,
	BCRYPT_SALT,
	BCRYPT_ROUNDS,
	SERVER_PORT,
	SERVER_HOST,
} = process.env

const APP_CONFIG = {
	server: {
		serverHost: SERVER_HOST || '0.0.0.0',
		serverPort: SERVER_PORT || 8080,
	},
	database: {
		username: DB_USER,
		password: DB_PASSWORD,
		host: DB_HOST,
		port: Number(DB_PORT || 4632),
		dbName: DB_NAME,
	},
	security: {
		jwtSecret: JWT_SECRET,
		salt: BCRYPT_SALT,
		rounds: Number(BCRYPT_ROUNDS || 10),
	},
}

export default APP_CONFIG
