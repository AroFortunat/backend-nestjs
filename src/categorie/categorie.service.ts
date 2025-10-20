import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';

@Injectable()
export class CategorieService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCategorie() {
    try {
      const categorie = await this.prismaService.category.findMany();
      if (!categorie) {
        throw new NotFoundException(
          "Get error the categorie when you try de get doesn't exist",
        );
      }
      return categorie;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOneCategorie(id: string) {
    try {
      const categorie = await this.prismaService.category.findUnique({
        where: {
          id,
        },
      });
      if (!categorie) {
        throw new NotFoundException(
          "Get error the categorie when you try de get doesn't exist",
        );
      }
      return categorie;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createCategorie(data: CreateCategorieDto) {
    try {
      const isExistingCategorie = await this.prismaService.category.findFirst({
        where: {
          slug: data.slug,
          title: data.title,
        },
      });
      if (isExistingCategorie) {
        throw new ConflictException(
          'Create error the categorie when you try de create already exist',
        );
      }

      const categorie = await this.prismaService.category.create({
        data,
      });
      return categorie;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateCategorie(id: string, data: CreateCategorieDto) {
    try {
      const isExistingCategorie = await this.prismaService.category.findFirst({
        where: {
          slug: data.slug,
          title: data.title,
        },
      });
      if (!isExistingCategorie) {
        throw new NotFoundException(
          "Update error the categorie when you try de update doesn't exist",
        );
      }
      const categorie = await this.prismaService.category.update({
        where: {
          id,
        },
        data,
      });
      return categorie;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteCategorie(id: string) {
    try {
      const isExistingCategorie = await this.prismaService.category.findFirst({
        where: {
          id,
        },
      });
      if (!isExistingCategorie) {
        throw new NotFoundException(
          "Delete error the categorie when you try de delete doesn't exist",
        );
      }
      const categorie = await this.prismaService.category.delete({
        where: {
          id,
        },
      });
      return categorie;
    } catch (error) {
      throw new Error(error);
    }
  }
}
