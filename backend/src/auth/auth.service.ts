import { Injectable, UnauthorizedException, ConflictException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string, name: string) {
    try {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await this.usersService.createUser({ email, password: hashed, name });

      const token = this.jwtService.sign({ sub: user.id, email: user.email });
      return { token };
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token };
  }
}
