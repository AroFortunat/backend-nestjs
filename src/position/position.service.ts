import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllPosition() {
    try {
      return await this.prisma.position.findMany();
    } catch (error) {
        new Error(error)
    }
  }

  async getOnePosition(id: number) {
    try {
      const position = await this.prisma.position.findUnique({
        where: {
          id,
        },
      });
      if (!position) {
        throw new NotFoundException("id doesn't exist : Position not found");
      }
      return position;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createPosition(data: string) {
    try {
      const positionExist = await this.prisma.position.findFirst({
        where:{
          name:data
        }
      });
      if (positionExist) {
        throw new BadRequestException(
          'Ce post existe déjà , veuillez choisir un autre !',
        );
      }
      return this.prisma.position.create({
        data: {
          name: data,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePosition(id: number,data: string) {
    try {
      const position = await this.prisma.position.findUnique({
        where: {
          id,
        },
      });
      if (!position) {
        throw new NotFoundException("id doesn't exist : Position not found");
      }
      return this.prisma.position.update({
        where: {
          id: id,
        },
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deletePosition(id: number) {
    try {
      const position = await this.prisma.position.findUnique({
        where: {
          id,
        },
      });
      if (!position) {
        throw new NotFoundException("id doesn't exist : Position not found");
      }
      return this.prisma.position.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
