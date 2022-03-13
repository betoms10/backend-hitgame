import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { MovieTheaterService } from './movie-theater.service'
import { CreateMovieTheaterDto } from './dto/create-movie-theater.dto'
import { UpdateMovieTheaterDto } from './dto/update-movie-theater.dto'
import { MovieTheaterVM } from './viewmodels/movie-theater.viewmodel'

@Controller('movie-theater')
@ApiTags('Movies Theaters')
export class MovieTheaterController {
	constructor(private movieTheaterService: MovieTheaterService) {}

	@Post()
	@ApiResponse({
		status: 201,
		type: MovieTheaterVM,
		description: 'Register a new movie theater',
	})
	create(
		@Body() createMovieTheaterDto: CreateMovieTheaterDto
	): Promise<MovieTheaterVM> {
		return this.movieTheaterService.create(createMovieTheaterDto)
	}

	@Put()
	@ApiResponse({
		status: 201,
		type: String,
		description: 'Update a movie theater',
	})
	update(
		@Body() updateMovieTheaterDto: UpdateMovieTheaterDto
	): Promise<string> {
		return this.movieTheaterService.update(updateMovieTheaterDto)
	}

	@Delete(':id')
	@ApiResponse({
		status: 201,
		type: String,
		description: 'Delete a movie theater',
	})
	delete(@Param('id') id: string): Promise<string> {
		return this.movieTheaterService.delete(id)
	}

	@Get()
	@ApiResponse({
		status: 201,
		type: MovieTheaterVM,
		isArray: true,
		description: 'Get all movies theaters',
	})
	getAll(): Promise<MovieTheaterVM[]> {
		return this.movieTheaterService.getAll()
	}
}
