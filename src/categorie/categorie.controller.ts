import { Controller, Post, Body, Put, Delete } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { Get, Param } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}
  @Get('all')
  getAllCategorie() {
    return this.categorieService.getAllCategorie();
  }

  @Get('/:id')
  getOneCategorie(@Param('id') id: string) {
    return this.categorieService.getOneCategorie(id);
  }
  @Post('create')
  createCategorie(@Body() data: CreateCategorieDto) {
    return this.categorieService.createCategorie(data);
  }
  @Put('update/:id')
  updateCategorie(@Param('id') id: string, @Body() data: CreateCategorieDto) {
    return this.categorieService.updateCategorie(id, data);
  }
  @Delete('delete/:id')
  deleteCategorie(@Param('id') id: string) {
    return this.categorieService.deleteCategorie(id);
  }
}
