import { Module } from '@nestjs/common';
import { CategorieController } from './categorie.controller';
import { CategorieService } from './categorie.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CategorieController],
  providers: [CategorieService,PrismaService]
})
export class CategorieModule {}
