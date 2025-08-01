import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Product, ProductSchema } from '../products/schemas/product.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }, { name: Product.name, schema: ProductSchema }]),],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
