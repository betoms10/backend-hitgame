import { AutoMapper, ignore, Profile, ProfileBase } from 'nestjsx-automapper'
import { CreateLocationDto } from '../dto/create-location.dto'
import { UpdateLocationDto } from '../dto/update-location.dto'
import { Location } from '../entities/location.entity'
import { LocationVM } from '../viewmodels/location.viewmodel'

@Profile()
export class LocationProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super()
		mapper
			.createMap(CreateLocationDto, Location)
			.forMember((dest) => dest.id, ignore())
			.reverseMap()
		mapper.createMap(UpdateLocationDto, Location).reverseMap()

		mapper.createMap(Location, LocationVM)
	}
}
