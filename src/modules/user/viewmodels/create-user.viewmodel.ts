import { ApiProperty } from '@nestjs/swagger'
import { AutoMap } from 'nestjsx-automapper'
import { CompanyVM } from 'src/modules/company/viewmodels/company.viewmodel'
import { UserRole } from '../../admin/entities/user-role.entity'
import { UserRoleVM } from './user-role.vielmodel'

export class CreateUserVM {
  @AutoMap()
  @ApiProperty()
  id?: string

  @ApiProperty()
  @AutoMap()
  firstName?: string

  @ApiProperty()
  @AutoMap()
  lastName?: string

  @ApiProperty()
  @AutoMap()
  fullName?: string

  @ApiProperty()
  @AutoMap()
  phoneNumber?: string

  @ApiProperty()
  @AutoMap()
  department?: string

  @ApiProperty()
  @AutoMap()
  email: string

  @ApiProperty()
  @AutoMap()
  theme?: string

  @ApiProperty()
  @AutoMap()
  lang?: string

  @ApiProperty()
  @AutoMap()
  timezone?: string

  @ApiProperty()
  @AutoMap()
  master?: boolean

  @ApiProperty()
  @AutoMap()
  avatar?: Buffer

  @ApiProperty()
  @AutoMap()
  createdAt?: Date

  @ApiProperty()
  @AutoMap()
  updatedAt?: Date

  @ApiProperty()
  @AutoMap()
  companyId?: string

  @ApiProperty({ type: [UserRole] })
  @AutoMap()
  roles?: UserRoleVM[]

  @ApiProperty()
  @AutoMap()
  company?: CompanyVM
}
