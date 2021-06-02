import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { UserLocationModule } from 'src/user-location/user-location.module';
import { UserLocationService } from 'src/user-location/user-location.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [UserModule, UserLocationModule],
  controllers: [LocationController],
  providers: [LocationService, PrismaService, UserService, UserLocationService],
  exports: [LocationService]
})
export class LocationModule { }
