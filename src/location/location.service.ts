import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { location, Prisma, user } from '@prisma/client';
import { PrismaService } from 'src/service/prisma.service';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';
import { LocationDelete } from './types/location-delete.type';
import Distance from './utils/distance.utils';

@Injectable()
export class LocationService {

  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<Array<location>> {
    return await this.prisma.location.findMany({
      include: {
        user_location: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findOne(locationWhereUniqueInput: Prisma.locationWhereUniqueInput): Promise<location | null> {
    const userLocation = await this.prisma.location.findUnique({
      where: locationWhereUniqueInput,
      include: {
        user_location: {
          include: {
            user: true
          }
        }
      }
    });
    return userLocation;
  }

  /**
   * prisma currently has bugs with cascade deletes
   * and stops deletes when foreign key is not null
   * such as is this case hence this solution as a
   * work around
   * @param locationWhereUniqueInput 
   * @returns {user: user, location: location}
   */
  async deleteOne(locationWhereUniqueInput: Prisma.locationWhereUniqueInput): Promise<LocationDelete> {
    const userLocation = await this.prisma.user_location.findFirst({
      where: {
        location_id: locationWhereUniqueInput.id
      }
    });
    const [_, deleteUser, deleteLocation] = await this.prisma.$transaction([
      this.prisma.user_location.delete({ where: { id: userLocation.id } }),
      this.prisma.user.delete({ where: { id: userLocation.user_id } }),
      this.prisma.location.delete({ where: { id: userLocation.location_id } })
    ]);
    return { 'user': deleteUser, 'location': deleteLocation };
  }

  async create(createLocationDTO: CreateLocationDTO): Promise<location> {
    return this.prisma.location.create({
      data: {
        longitude: createLocationDTO.longitude,
        latitude: createLocationDTO.latitude,
      }
    });
  }

  async update(id: number, updateLocationDTO: UpdateLocationDTO): Promise<location> {
    let data: UpdateLocationDTO = {};
    if (updateLocationDTO.latitude) {
      data.latitude = updateLocationDTO.latitude
    }
    if (updateLocationDTO.longitude) {
      data.longitude = updateLocationDTO.longitude
    }
    return await this.prisma.location.update({
      where: {
        id: id
      },
      data: data
    });
  }

  async findDistance(locationId: number, latitude: number, longitude: number): Promise<number | null> {
    const lc = await this.prisma.location.findFirst({
      where: {
        id: locationId
      }
    });
    if (!lc) return null;
    const distance = Distance.byHaversine(lc.latitude, lc.longitude, latitude, longitude);
    return distance;
  }
}
