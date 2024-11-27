import {
  NeighborhoodEnum,
  HouseDetailsEnum,
  CondoDetailsEnum,
  ApartmentDetailsEnum,
} from 'src/neighborhood/entity/neighborhood.entity';
import { PropertyConditionEnum } from '../entity/property.entity';

export class CreatePropertyDto {
  neighborhood?: NeighborhoodEnum;
  name: string;
  details?: HouseDetailsEnum | CondoDetailsEnum | ApartmentDetailsEnum;
  address: string;
  condition: PropertyConditionEnum;
  area: number;
  dorms: number;
  owner: string;
  phone: string;
  price: number;
  reportValue?: number;
  type: string;
  condoPrice?: number;
  aptoNumber?: number;
  carSpaces?: number;
  featuredImage?: string;
  reportWritenAt: Date;
  images?: string[];
}
