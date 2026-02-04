// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}

// import { Controller, Post, Body, Get } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   async login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto.email, loginDto.password);
//   }

//   @Post('register')
//   async register(@Body() loginDto: LoginDto) {
//     return this.authService.register(loginDto.email, loginDto.password);
//   }

//   // ✅ Add this route to fix "Cannot GET /auth/all"
//   @Get('all')
//   async getAllUsers() {
//     return this.authService.findAll();
//   }
// }


import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: LoginDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('all')
  findAll() {
    return this.authService.findAll();
  }
}