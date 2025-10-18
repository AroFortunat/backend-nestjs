import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  registerUser(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
  @Post('login')
  loginUser(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.validateUser(req.user.userId);
  }
}
