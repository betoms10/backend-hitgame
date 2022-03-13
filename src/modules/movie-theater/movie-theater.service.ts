import { Inject, Injectable } from '@nestjs/common'
import { AutoMapper, InjectMapper } from 'nestjsx-automapper'
import { Repository } from 'typeorm'
import { CreateMovieTheaterDto } from './dto/create-movie-theater.dto'
import { UpdateMovieTheaterDto } from './dto/update-movie-theater.dto'
import { MovieTheater } from './entities/movie-theater.entity'
import { MovieTheaterVM } from './viewmodels/movie-theater.viewmodel'

@Injectable()
export class MovieTheaterService {
	constructor(
		@Inject('MOVIETHEATER_REPOSITORY')
		private movieTheaterRepository: Repository<MovieTheater>,
		@InjectMapper() private readonly mapper: AutoMapper
	) {}

	async create(
		createMovieTheaterDto: CreateMovieTheaterDto
	): Promise<MovieTheaterVM> {
		const newMovieTheater = this.mapper.map(
			createMovieTheaterDto,
			MovieTheater,
			CreateMovieTheaterDto
		)

		delete newMovieTheater.id
		delete newMovieTheater.createdAt

		const movieTheater = await this.movieTheaterRepository.save(newMovieTheater)

		return this.mapper.map(movieTheater, MovieTheaterVM, MovieTheater)
	}

	async update(updateMovieTheaterDto: UpdateMovieTheaterDto): Promise<string> {
		const movieTheater: MovieTheater = await this.mapper.map<MovieTheaterVM>(
			updateMovieTheaterDto,
			MovieTheater,
			UpdateMovieTheaterDto
		)
		delete movieTheater.createdAt
		const updated = await this.movieTheaterRepository.save({
			...movieTheater,
			updatedAt: new Date(),
		})

		return `Movie theater with id: ${updated.id} was updated.`
	}

	async delete(id: string): Promise<string> {
		await this.movieTheaterRepository.delete(id)
		return `Movie theater with id: ${id} was deleted.`
	}

	async getAll(): Promise<MovieTheaterVM[]> {
		const movieTheater = await this.movieTheaterRepository.find()
		return this.mapper.mapArray(movieTheater, MovieTheaterVM, MovieTheater)
	}
}
