import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entity/property.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  async createWithImg(
    createPropertyDto: CreatePropertyDto,
    featuredImage: Express.Multer.File,
  ): Promise<any> {
    try {
      const property = await this.create(createPropertyDto);
      await this.uploadFeaturedImage(property.id, featuredImage);
      const fileUrl = await getImageUrl(property.id);
      this.update(property.id, { featuredImage: fileUrl });

      return property;
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  findOne(id: string): Promise<Property> {
    return this.propertyRepository.findOneBy({ id });
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return this.propertyRepository.update(id, updatePropertyDto);
  }

  async remove(id: string): Promise<any> {
    return Promise.all([
      await this.propertyRepository.delete(id),
      await deletePropertyImages(id),
    ]);
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

async function getImageUrl(id: string): Promise<string> {
  const storage = getStorage();
  const storageRef = ref(storage, `properties/${id}/featured-image`);

  try {
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
}

async function deletePropertyImages(id: string): Promise<void> {
  const storage = getStorage();
  const storageRef = ref(storage, `properties/${id}`);

  try {
    const all = await listAll(storageRef);
    await Promise.all(
      all.items.map(async (item) => {
        try {
          await deleteObject(item);
        } catch (error) {
          console.error('Error deleting property images:', error);
        }
      }),
    );
  } catch (error) {
    console.error('Error deleting property images:', error);
  }
}
