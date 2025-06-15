import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItem, CartItemDocument } from './schemas/cart-item.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartItem.name) private cartModel: Model<CartItemDocument>
  ) {}

  async addToCart(userId: string, productId: string, quantity = 1) {
    const existing = await this.cartModel.findOne({ userId, product: productId });
    if (existing) {
      existing.quantity += quantity;
      return existing.save();
    }

    const item = new this.cartModel({ userId, product: productId, quantity });
    return item.save();
  }

  async getCart(userId: string) {
    return this.cartModel.find({ userId: userId }).populate('product');
  }

  async removeFromCart(userId: string, productId: string) {
    return this.cartModel.deleteOne({ userId: userId, product: productId });
  }

  async decreaseFromCart(userId: string, productId: string) {
  const item = await this.cartModel.findOne({ userId, product: productId });

  if (!item) return null;

  if (item.quantity > 1) {
    item.quantity -= 1;
    return item.save();
  } else {
    return this.cartModel.deleteOne({ userId, product: productId });
  }
}

  async clearCart(userId: string) {
    return this.cartModel.deleteMany({ userId: userId });
  }
}