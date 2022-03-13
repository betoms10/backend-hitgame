import { AutoMapper, ignore, Profile, ProfileBase } from 'nestjsx-automapper'
import { CreateMovieTheaterDto } from '../dto/create-movie-theater.dto'
import { UpdateMovieTheaterDto } from '../dto/update-movie-theater.dto'
import { MovieTheater } from '../entities/movie-theater.entity'
import { MovieTheaterVM } from '../viewmodels/movie-theater.viewmodel'

@Profile()
export class MovieTheaterProfile extends ProfileBase {
	constructor(mapper: AutoMapper) {
		super()
		mapper
			.createMap(CreateMovieTheaterDto, MovieTheater)
			.forMember((dest) => dest.id, ignore())
			.forMember((dest) => dest.createdAt, ignore())
			.forMember((dest) => dest.updatedAt, ignore())

		mapper
			.createMap(UpdateMovieTheaterDto, MovieTheater)
			.forMember((dest) => dest.createdAt, ignore())
			.forMember((dest) => dest.updatedAt, ignore())

		mapper.createMap(MovieTheater, MovieTheaterVM).reverseMap()
	}
}
