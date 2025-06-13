import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types  } from 'mongoose';
import { Category } from './schemas/category.schema';
import { Product } from '../products/schemas/product.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(name: string): Promise<Category> {
    const created = new this.categoryModel({ name });
    return created.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findWithProducts(id: string) {
    const category = await this.categoryModel.findById(id).lean();
    if (!category) throw new NotFoundException(`Categories ${id} not found`);

    const products = await this.productModel.find({ category: new Types.ObjectId(id) }).lean();

    return {
      ...category,
      products,
    };
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.categoryModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Categories ${id} not found`);
    }
    return { message: `Categories ${id} deleted` };
  }
}
