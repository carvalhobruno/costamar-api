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
  reportWrittenAt: Date;

  static convertFromDataForm(data: any) {
    return {
      neighborhood: data.neighborhood,
      name: data.name,
      details: data.details,
      address: data.address,
      condition: data.condition,
      area: this.convertToNumber(data.area),
      dorms: this.convertToNumber(data.dorms),
      owner: data.owner,
      phone: data.phone,
      price: this.convertToNumber(data.price),
      reportValue: this.convertToNumber(data.reportValue),
      type: data.type,
      condoPrice: this.convertToNumber(data.condoPrice),
      aptoNumber: this.convertToNumber(data.aptoNumber),
      carSpaces: this.convertToNumber(data.carSpaces),
      featuredImage: data.featuredImage,
      reportWrittenAt: this.parseDate(data.reportWrittenAt),
    };
  }

  static convertToNumber(value) {
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  static parseDate(value) {
    if (!value || value === 'undefined' || value === 'null') return null;
    return new Date(value);
  }
}
