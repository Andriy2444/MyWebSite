import { Controller, Post, Body, Get, Patch, Delete, UseGuards, Request, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:id')
  async add(@Request() req, @Param('id') productId: string, @Body('quantity') quantity: number) {
    const userId = req.user.userId;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Get()
  async get(@Request() req) {
    const userId = req.user.userId;
    return this.cartService.getCart(userId);
  }

  @Delete('remove/:id')
  async remove(@Request() req, @Param('id') productId: string) {
    const userId = req.user.userId;
    return this.cartService.removeFromCart(userId, productId);
  }

  @Patch('decrease/:id')
  async decreaseItem(@Request() req, @Param('id') productId: string) {
    const userId = req.user.userId;
    return this.cartService.decreaseFromCart(userId, productId);
  }

  @Delete('clear')
  async clear(@Request() req) {
    const userId = req.user.userId;
    return this.cartService.clearCart(userId);
  }
}