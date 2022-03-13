import { AutoMapper, ignore, Profile, ProfileBase } from 'nestjsx-automapper'
import { CreateMoviesDto } from '../dto/create-movies.dto'
import { UpdateMoviesDto } from '../dto/update-movies.dto'
import { Movies } from '../entities/movies.entity'
import { MoviesVM } from '../viewmodels/movies.viewmodel'

@Profile()
export class MoviesProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super()
		mapper
			.createMap(CreateMoviesDto, Movies)
			.forMember((dest) => dest.id, ignore())
			.forMember((dest) => dest.createdAt, ignore())
			.forMember((dest) => dest.updatedAt, ignore())

		mapper
			.createMap(UpdateMoviesDto, Movies)
			.forMember((dest) => dest.createdAt, ignore())
			.forMember((dest) => dest.updatedAt, ignore())

		mapper.createMap(Movies, MoviesVM).reverseMap()
	}
}
