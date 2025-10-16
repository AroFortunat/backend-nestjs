import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllTeam() {
    try {
      return await this.prismaService.team.findMany();
    } catch (error) {
      return new Error(error);
    }
  }

  async getOneTeam(id: number) {
    try {
      const teamExist = await this.prismaService.team.findUnique({
        where: {
          id,
        },
      });
      if (!teamExist) {
        throw new NotFoundException("Equipe non trouver")
      }
      return teamExist
    } catch (error) {
      return new Error(error);
    }
  }
  async updateTeamName(id: number, data: {"name":string,"country":string}) {
    try {
      const idExist = await this.prismaService.team.findUnique({
        where: {
          id,
        },
      });
      if (!idExist) {
        throw new Error('id inexistant');
      }
      return this.prismaService.team.update({
        where: {
          id,
        },
        data:{
          ...data
        }
      });
    } catch (error) {
      return new Error(error);
    }
  }
  async createTeamName(team: string,country:string) {
    try {

        const teamExist = await this.prismaService.team.findFirst({
            where:{
                name:team
            }
        })

        if (teamExist) {
            throw new NotFoundException("Equipe déjà existante")
        }

        return await this.prismaService.team.create({
          data:{
            name:team,
            country:country
          }  
        })

    } catch (error) {
        return new Error(error)
    }
  }
  async deleteTeamById(id:number){
    try {
        const team = await this.prismaService.team.findUnique({
            where:{id}
        })
        if (!team) {
            throw new Error("Team id not found")
        }
        return await this.prismaService.team.delete({
            where:{
                id
            }
        })
    } catch (error) {
        return new Error(error)
    }
  }
}
