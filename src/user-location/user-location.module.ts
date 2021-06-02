import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { UserLocationService } from './user-location.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserLocationService, PrismaService],
  exports: [UserLocationService]
})
export class UserLocationModule { }
