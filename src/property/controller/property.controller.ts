import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertyService } from '../service/property.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    console.log('createPropertyDto', createPropertyDto);

    return this.propertyService.createWithImg(
      CreatePropertyDto.convertFromDataForm(createPropertyDto),
      file,
    );
  }

  @Public()
  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }

  // @Post(':id/featured-image')
  @Public()
  @Post(':id/featured-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadFeaturedImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.propertyService.uploadFeaturedImage(id, file);
  }
}
