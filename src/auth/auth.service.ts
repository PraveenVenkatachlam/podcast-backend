// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Login } from './entity/login.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(Login)
//     private readonly loginRepository: Repository<Login>,
//   ) {}

//   async login(email: string, password: string): Promise<any> {
//     const user = await this.loginRepository.findOne({
//       where: { email, password },
//     });

//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     return { message: 'Login successful', user };
//   }

//   async register(email: string, password: string): Promise<any> {
//     const newUser = this.loginRepository.create({ email, password });
//     await this.loginRepository.save(newUser);
//     return { message: 'User registered successfully', newUser };
//   }

//   async findAll(): Promise<Login[]> {
//     return this.loginRepository.find();
//   }
// }


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Login } from './entity/login.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTER
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.loginRepository.create({
      email,
      password: hashedPassword,
    });

    await this.loginRepository.save(user);

    return { message: 'User registered successfully' };
  }

  // LOGIN
  async login(email: string, password: string) {
    const user = await this.loginRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // GET ALL USERS (for testing only)
  async findAll() {
    const users = await this.loginRepository.find();
    return users.map(({ password, ...rest }) => rest);
  }
}