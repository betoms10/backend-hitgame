import { AutoMap } from 'nestjsx-automapper'
import { ProfileVM } from './profile.viewmodel'
import { RoleVM } from './role.viewmodel'
export class UserVM {
  @AutoMap()
  id: string
  @AutoMap()
  firstName: string
  @AutoMap()
  lastName: string
  @AutoMap()
  fullName: string
  @AutoMap()
  userName: string
  @AutoMap()
  email: string
  @AutoMap()
  companyId?: string
  @AutoMap()
  phoneNumber?: string
  @AutoMap()
  theme?: string
  @AutoMap()
  timezone?: string
  @AutoMap()
  department?: string
  @AutoMap()
  master?: boolean
  @AutoMap()
  lang?: string
  @AutoMap()
  roles?: RoleVM[]
  @AutoMap()
  profileId?: string
  @AutoMap()
  profile?: ProfileVM
  @AutoMap()
  createdAt?: Date
  @AutoMap()
  active?: boolean
}
