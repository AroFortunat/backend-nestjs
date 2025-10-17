import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePostionDTO } from './dto/create-position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/all')
  getAllPosition() {
    return this.positionService.getAllPosition();
  }
  @Get('/:id')
  getOnePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.getOnePosition(id);
  }
  @Put('/:id')
  updatePosition(@Param('id', ParseIntPipe) id: number, @Body() data: string) {
    return this.positionService.updatePosition(id, data);
  }
  @Delete('/:id')
  deletePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.deletePosition(id);
  }
  @Post('/create')
  createPosion(@Body() data: CreatePostionDTO) {
    return this.positionService.createPosition(data);
  }
}
