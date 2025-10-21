import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    try {
      const { firstName, lastName, email, password } = data;
      const existingEmail = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (existingEmail) {
        throw new ConflictException('Un utilisateur possède déjà cette email');
      }

      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password, saltRound);
      const user = await this.prisma.user.create({
        data: {
          firstName,
          email,
          lastName,
          password: hashedPassword,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          CreatedAt: true,
        },
      });
      const payload = { sub: user.id, email: user.email };
      const accesToken = await this.jwt.signAsync(payload);
      return {
        user,
        accesToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(loginDto: LoginUserDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new UnauthorizedException('Identifiant invalid');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Identifiant invalid');
      }
      const payload = { sub: user.id, email: user.email };
      const accesToken = await this.jwt.signAsync(payload);
      const{firstName,email:Email,lastName} = user
      return {
        user:{
            firstName,
            Email,
            lastName
        },
        accesToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async validateUser(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          CreatedAt: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
