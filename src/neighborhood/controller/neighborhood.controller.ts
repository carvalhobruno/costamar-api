import { Controller, Get } from '@nestjs/common';
import { NeighborhoodService } from '../service/neighborhood.service';

@Controller('neighborhoods')
export class NeighborhoodController {
  constructor(private readonly neighborhoodService: NeighborhoodService) {}

  @Get()
  getNeighborhoods() {
    return this.neighborhoodService.getNeighborhoods();
  }
}
