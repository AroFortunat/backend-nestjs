import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeam } from './dto/create-team.dto';
import { UpdateTeam } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/all')
  showAllTeam() {
    return this.teamService.getAllTeam();
  }

  @Get('/:id')
  showOneTeam(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.getOneTeam(id);
  }
  @Post()
  saveTeam(@Body() data: CreateTeam) {
    return this.teamService.createTeamName(data);
  }
  @Delete('/:id')
  deletTeam(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.deleteTeamById(id);
  }
  @Put('/:id')
  editTeam(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTeam) {
    return this.teamService.updateTeamName(id, data);
  }
}
