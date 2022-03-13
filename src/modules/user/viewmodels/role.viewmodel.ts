import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class RoleVM {
  @AutoMap()
  @ApiProperty()
  id?: string

  @AutoMap()
  @ApiProperty()
  role?: string

  @AutoMap()
  @ApiProperty()
  description?: string

  @AutoMap()
  @ApiProperty()
  active?: boolean

  @AutoMap()
  @ApiProperty()
  createdAt?: Date

  @AutoMap()
  @ApiProperty()
  updatedAt?: Date
}
