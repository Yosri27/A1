import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/DB/models/Product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

 
  ProductModel : Model<Product>
  constructor(@InjectModel(Product.name)ProductModel : Model<Product>)
  {
      this.ProductModel = ProductModel
  }




  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
   return await this.ProductModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
