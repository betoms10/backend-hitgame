import { Inject, Injectable } from '@nestjs/common'
import { AutoMapper, InjectMapper } from 'nestjsx-automapper'
import { Repository } from 'typeorm'
import { CreateMoviesDto } from './dto/create-movies.dto'
import { UpdateMoviesDto } from './dto/update-movies.dto'
import { Movies } from './entities/movies.entity'
import { MoviesVM } from './viewmodels/movies.viewmodel'

@Injectable()
export class MoviesService {
	constructor(
		@Inject('MOVIES_REPOSITORY')
		private moviesRepository: Repository<Movies>,
		@InjectMapper() private readonly mapper: AutoMapper
	) {}

	async create(createMoviesDto: CreateMoviesDto): Promise<MoviesVM> {
		const newMovie = this.mapper.map(createMoviesDto, Movies, CreateMoviesDto)

		delete newMovie.id
		delete newMovie.createdAt

		const dashboard = await this.moviesRepository.save(newMovie)

		return this.mapper.map(dashboard, MoviesVM, Movies)
	}

	async update(updateMoviesDto: UpdateMoviesDto): Promise<string> {
		const movies: Movies = await this.mapper.map<MoviesVM>(
			updateMoviesDto,
			Movies,
			UpdateMoviesDto
		)
		delete movies.createdAt
		const updated = await this.moviesRepository.save({
			...movies,
			updatedAt: new Date(),
		})

		return `Movie with id: ${updated.id} was updated.`
	}

	async delete(id: string): Promise<string> {
		await this.moviesRepository.delete(id)
		return `Movie with id: ${id} was deleted.`
	}

	async getAll(): Promise<MoviesVM[]> {
		const movies = await this.moviesRepository.find()
		return this.mapper.mapArray(movies, MoviesVM, Movies)
	}
}
