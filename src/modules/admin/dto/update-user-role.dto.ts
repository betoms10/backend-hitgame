import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class UpdateUserRoleDto {
  @ApiProperty()
  @AutoMap()
  userId: string
  @ApiProperty()
  @AutoMap()
  roleId: string
  @ApiProperty()
  @AutoMap()
  active?: boolean
}
