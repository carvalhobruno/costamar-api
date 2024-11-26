import { Module } from '@nestjs/common';
import { PropertyController } from './controller/property.controller';
import { PropertyService } from './service/property.service';
import { Property } from './entity/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
