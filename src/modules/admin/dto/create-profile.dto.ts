/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'
export class CreateProfileDto {
 
  @AutoMap()
  @ApiProperty()
  profile?: string

  @AutoMap()
  @ApiProperty()
  status?: boolean

  @AutoMap()
  @ApiProperty()
  menu?: any

  @AutoMap()
  @ApiProperty()
  companyId?: any

  @AutoMap()
  @ApiProperty()
  company?: any

}
