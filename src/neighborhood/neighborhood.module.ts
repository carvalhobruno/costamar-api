import { Module } from '@nestjs/common';
import { NeighborhoodService } from './service/neighborhood.service';
import { NeighborhoodController } from './controller/neighborhood.controller';
import { Neighborhood } from './entity/neighborhood.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Neighborhood])],

  providers: [NeighborhoodService],
  controllers: [NeighborhoodController],
})
export class NeighborhoodModule {}
