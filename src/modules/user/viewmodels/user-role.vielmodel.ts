import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'
import { RoleVM } from './role.viewmodel'

export class UserRoleVM {
  @AutoMap()
  @ApiProperty()
  userId?: string

  @AutoMap()
  @ApiProperty()
  roleId?: string

  @AutoMap()
  @ApiProperty()
  active?: boolean

  @AutoMap()
  @ApiProperty()
  createdAt?: Date

  @AutoMap()
  @ApiProperty()
  updatedAt?: Date

  @AutoMap()
  @ApiProperty()
  role?: RoleVM
}
