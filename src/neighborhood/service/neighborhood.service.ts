import { Injectable } from '@nestjs/common';
import { NeighborhoodEnum } from '../entity/neighborhood.entity';

@Injectable()
export class NeighborhoodService {
  getNeighborhoods(): string[] {
    return Object.values(NeighborhoodEnum);
  }
}
