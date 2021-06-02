import { Controller, Delete, Get, Post, Put, Body, Param, ParseIntPipe, HttpException, Query } from '@nestjs/common';
import { location } from '@prisma/client';
import { UserLocationService } from 'src/user-location/user-location.service';
import { UserService } from 'src/user/user.service';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';
import { LocationService } from './location.service';
import AppResponse from 'src/http/response';
import { DistanceQueryDTO } from './dto/distance-query.dto';

@Controller('location')
export class LocationController {

  constructor(private readonly locationService: LocationService, private readonly userService: UserService, private readonly userLocationService: UserLocationService) { }

  @Get()
  async findAll(): Promise<AppResponse> {
    const locations = await this.locationService.findAll();
    return AppResponse.success('User location records', locations);
  }

  @Post()
  async create(@Body() createLocationDTO: CreateLocationDTO): Promise<AppResponse> {
    try {
      const user = await this.userService.create(createLocationDTO.user);
      const location = await this.locationService.create(createLocationDTO);
      await this.userLocationService.create(user.id, location.id);
      return AppResponse.success('Location created', { 'location': location, 'user': user });
    } catch (error) {
      AppResponse.internalServerError('Error creating location', error);
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateLocationDTO: UpdateLocationDTO): Promise<AppResponse> {
    try {
      const update = await this.locationService.update(id, updateLocationDTO);
      return AppResponse.success('Update successful', update);
    } catch (error) {
      AppResponse.notFound('Location not found', error);
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<AppResponse> {
    try {
      const removeLocation = await this.locationService.deleteOne({ id: id });
      return AppResponse.success('Location successfully deleted', removeLocation);
    } catch (error) {
      AppResponse.notFound('Location not found', error);
    }
  }

  @Get('/distance/:locationId')
  async findDistance(@Param('locationId', ParseIntPipe) locationId: number, @Query() query: DistanceQueryDTO): Promise<AppResponse> {
    const distance = await this.locationService.findDistance(locationId, query.latitude, query.longitude);
    if (isNaN(distance)) {
      AppResponse.notFound('Location was not found', { id: locationId });
    }
    return AppResponse.success('Distance in Kilometers', { distance: distance });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<AppResponse> {
    const record = await this.locationService.findOne({ id: id });
    if (record) {
      return AppResponse.success('Location information', record);
    }
    AppResponse.notFound('Location not found', record);
  }
}
