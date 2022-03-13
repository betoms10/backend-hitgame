import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class UserCredentialVM {
  @AutoMap()
  @ApiProperty()
  token: string
  @AutoMap()
  @ApiProperty()
  refreshToken: string
  @AutoMap()
  @ApiProperty()
  expires: number
  @AutoMap()
  @ApiProperty()
  userName: string
}
