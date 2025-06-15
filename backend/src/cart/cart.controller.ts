import { Controller, Post, Body, Get, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async add(@Request() req, @Body('productId') productId: string, @Body('quantity') quantity: number) {
    const userId = req.user.userId;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Get()
  async get(@Request() req) {
    const userId = req.user.userId;
    return this.cartService.getCart(userId);
  }

  @Delete('remove')
  async remove(@Request() req, @Body('productId') productId: string) {
    const userId = req.user.userId;
    return this.cartService.removeFromCart(userId, productId);
  }

  @Delete('clear')
  async clear(@Request() req) {
    const userId = req.user.userId;
    return this.cartService.clearCart(userId);
  }
}