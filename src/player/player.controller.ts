import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import type { Player } from 'generated/prisma';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}
  @Get('/all')
  showAllPlayer() {
    return this.playerService.getAllplayer();
  }
  @Get('/:id')
  showOnePlayerById(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.getOneplayer(id);
  }
  @Post()
  savePlayer(@Body() player: Player) {
    return this.playerService.createplayerName(player);
  }
  @Put('/:id')
  editPlayer(@Param('id', ParseIntPipe) id: number, @Body() data: Player) {
    return this.playerService.updatePlayer(id, data);
  }
  @Delete('/:id')
  removePlayer(@Param('id', ParseIntPipe) id:number){
     return this.playerService.deletedPlayerById(id)
  }
}
