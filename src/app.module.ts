import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationController } from './location/location.controller';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserLocationModule } from './user-location/user-location.module';

@Module({
  imports: [LocationModule, UserLocationModule, UserModule],
  controllers: [AppController, LocationController, UserController],
  providers: [AppService],
})

export class AppModule { }
