import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/service/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create(userDTO: CreateUserDTO): Promise<user> {
    return await this.prisma.user.create({
      data: {
        name: userDTO.name,
        website_url: userDTO.websiteUrl,
        phone: userDTO.phoneNumber
      }
    });
  }
}
