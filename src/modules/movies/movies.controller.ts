import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { MoviesService } from './movies.service'
import { CreateMoviesDto } from './dto/create-movies.dto'
import { UpdateMoviesDto } from './dto/update-movies.dto'
import { MoviesVM } from './viewmodels/movies.viewmodel'

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
	constructor(private moviesService: MoviesService) {}

	@Post()
	@ApiResponse({
		status: 201,
		type: MoviesVM,
		description: 'Register a new movie',
	})
	create(@Body() createmoviesDto: CreateMoviesDto): Promise<MoviesVM> {
		return this.moviesService.create(createmoviesDto)
	}

	@Put()
	@ApiResponse({
		status: 201,
		type: String,
		description: 'Update movie',
	})
	update(@Body() updatemoviesDto: UpdateMoviesDto): Promise<string> {
		return this.moviesService.update(updatemoviesDto)
	}

	@Delete(':id')
	@ApiResponse({
		status: 201,
		type: String,
		description: 'Delete movie',
	})
	delete(@Param('id') id: string): Promise<string> {
		return this.moviesService.delete(id)
	}

	@Get()
	@ApiResponse({
		status: 201,
		type: MoviesVM,
		isArray: true,
		description: 'Get all movies',
	})
	getAll(): Promise<MoviesVM[]> {
		return this.moviesService.getAll()
	}
}
