import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entity/property.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  async findAll(): Promise<Property[]> {
    const properties = await this.propertyRepository.find();
    const propertiesWithImages = await Promise.all(
      properties.map(async (property) => {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          'properties/' + property.id + '/featured-image',
        );
        try {
          const url = await getDownloadURL(storageRef);
          return { ...property, featuredImage: url };
        } catch (error) {
          console.error(error);
          return property;
        }
      }),
    );
    return propertiesWithImages;
  }

  findOne(id: string): Promise<Property> {
    return this.propertyRepository.findOneBy({ id });
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return this.propertyRepository.update(id, updatePropertyDto);
  }

  async remove(id: string): Promise<void> {
    await this.propertyRepository.delete(id);
  }

  async uploadFeaturedImage(id: string, file: Express.Multer.File) {
    const storage = getStorage();
    const storageRef = ref(storage, 'properties/' + id + '/featured-image');
    try {
      await uploadBytes(storageRef, file.buffer);
      const url = await getDownloadURL(storageRef);
      return this.update(id, { featuredImage: url });
    } catch (error) {
      console.error(error);
    }
  }
}
