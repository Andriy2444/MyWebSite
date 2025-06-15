import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createDto: CreateProductDto): Promise<Product> {
      const created = new this.productModel(createDto);
      return created.save();
  }

  async findAll(filters: {
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const query: any = {};

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) {
        query.price.$gte = Number(filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query.price.$lte = Number(filters.maxPrice);
      }
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.search) {
      query.name = { $regex: filters.search, $options: 'i' };
    }

    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 10;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.productModel.find(query).populate('category').skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(query),
    ]);

    return {
      data: products,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('category').exec();
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async update(id: string, updateDto: UpdateProductDto): Promise<Product> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Product ${id} not found`);
    return updated;
  }

  async delete(id: string): Promise<{message: string}> {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return { message: `Product ${id} deleted` };
  }

}
