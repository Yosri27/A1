import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from 'src/DB/models/brand.model';
import { User } from 'src/DB/models/user.model';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name)private readonly brandModel,
@InjectModel(User.name)private readonly userModel) {

   }


  async create(createBrandDto: CreateBrandDto) {
    let exists = await this.brandModel.findOne({name :  createBrandDto.name})
    if (exists)  {
        throw new ConflictException("Brand already exists")

    }
    let data = await this.brandModel.create({
      ...createBrandDto,
      createdBy : User.name
    })
    return data
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
