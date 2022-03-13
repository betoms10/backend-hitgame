import { Inject, Injectable } from '@nestjs/common'
import { AutoMapper, InjectMapper } from 'nestjsx-automapper'
import { Repository } from 'typeorm'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { Location } from './entities/location.entity'
import { LocationVM } from './viewmodels/location.viewmodel'
@Injectable()
export class LocationService {
	constructor(
		@Inject('LOCATION_REPOSITORY')
		private locationRepository: Repository<Location>,
		@InjectMapper() private readonly mapper: AutoMapper
	) {}

	async create(createLocationDto: CreateLocationDto): Promise<LocationVM> {
		const newLocation: Location = this.mapper.map<Location>(
			createLocationDto,
			Location,
			CreateLocationDto
		)

		delete newLocation.id

		const location = await this.locationRepository.save(newLocation)

		return this.mapper.map<LocationVM>(location, LocationVM, Location)
	}

	async findAll(companyId) {
		const locations = await this.locationRepository.query(`
    SELECT 
    	id, code, type, name, client_version, created_at, size, show_on_dashboard, provider, state 
    FROM public.location
	WHERE company_id = '${companyId}'  
	ORDER BY created_at DESC;
    `)
		return locations
	}

	async findAllActive(companyId) {
		const locations = await this.locationRepository.find({
			relations: ['sensors'],
			where: {
				showOnDashboard: true,
				companyId: companyId,
			},
		})
		return this.mapper.mapArray(locations, LocationVM, Location)
	}

	async findOne(id: string): Promise<LocationVM> {
		const location = await this.locationRepository.findOne(id, {
			relations: ['sensors'],
		})
		return this.mapper.map<LocationVM>(location, LocationVM, Location)
	}

	async activeLocation(id: string): Promise<any> {
		const location = await this.locationRepository.query(`
    UPDATE location 
    SET show_on_dashboard = 
    CASE 
    WHEN show_on_dashboard = true THEN false ELSE true END
    WHERE id = '${id}';`)
		return {
			status: 200,
			description: `Updated with sucess`,
			data: location,
		}
	}

	async update(updateLocationDto: UpdateLocationDto): Promise<any> {
		const location = this.mapper.map<Location>(
			updateLocationDto,
			Location,
			UpdateLocationDto
		)

		const updated = await this.locationRepository.save({
			...location,
			updatedAt: new Date(),
		})

		return {
			status: 200,
			description: `Location with id: ${updated.id} was updated.`,
		}
	}

	async remove(id: string): Promise<any> {
		await this.locationRepository.query(`
    DELETE FROM public.sensor WHERE location_id = '${id}';
    DELETE FROM public.location WHERE id = '${id}';
	  `)
		return {
			status: 200,
			description: `Location with id: ${id} was deleted.`,
		}
	}
}
