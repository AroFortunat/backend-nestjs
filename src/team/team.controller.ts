import { Controller, Get, ParseIntPipe, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { TeamService } from './team.service';

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
  saveTeam(@Body() data:{"name":string,"country":string} ){
    return this.teamService.createTeamName(data.name,data.country)
  }
  @Delete('/:id')
  deletTeam(@Param('id', ParseIntPipe) id:number){
    return this.teamService.deleteTeamById(id)
  }
  @Put('/:id')
  editTeam(@Param('id', ParseIntPipe)id:number, @Body() data:{"name":string,"country":string}){
      return this.teamService.updateTeamName(id,data)
  }
}
