import { Injectable } from '@nestjs/common';
import { user_location } from '@prisma/client';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class UserLocationService {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, locationId: number): Promise<user_location> {
    return await this.prisma.user_location.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        location: {
          connect: {
            id: locationId
          }
        }
      }
    })
  }
}
