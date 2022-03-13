import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'

export class StatusVM {
  @AutoMap()
  @ApiProperty()
  id?: string

  @AutoMap()
  @ApiProperty()
  name?: string

  @AutoMap()
  @ApiProperty()
  typeRef?: string

  @AutoMap()
  createdAt?: Date

  @AutoMap()
  updatedAt?: Date
}
