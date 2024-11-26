import { NeighborhoodEnum } from 'src/neighborhood/entity/neighborhood.entity';
import { PropertyConditionEnum } from '../entity/property.entity';

export class CreatePropertyDto {
  neighborhood?: NeighborhoodEnum;
  name: string;
  details?: string;
  address: string;
  condition: PropertyConditionEnum;
  area: number;
  dorms: number;
  owner: string;
  phone: string;
  price: number;
  reportValue?: number;
  entry?: number;
  type: string;
  condoPrice?: number;
  carSpaces?: number;
  aptoQuantity?: number;
  featuredImage?: string;
  images?: string[];
}
