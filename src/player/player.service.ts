import { Injectable, NotFoundException } from '@nestjs/common';
import type { Player } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayerService {
    constructor(private readonly prismaService: PrismaService) {}
    
      async getAllplayer() {
        try {
          return await this.prismaService.player.findMany();
        } catch (error) {
          return new Error(error);
        }
      }
    
      async getOneplayer(id: number) {
        try {
          const playerExist = await this.prismaService.player.findUnique({
            where: {
              id,
            },
          });
          if (!playerExist) {
            throw new NotFoundException("Equipe non trouver")
          }
          return playerExist
        } catch (error) {
          return new Error(error);
        }
      }
      async updatePlayer(id: number, data: Player) {
        try {
          const idExist = await this.prismaService.player.findUnique({
            where: {
              id,
            }
          });
          if (!idExist) {
            throw new Error('id inexistant');
          }
          return await this.prismaService.player.update({
            where: {
              id
            },
            data:{
              ...data
            }
          });
        } catch (error) {
          return new Error(error);
        }
      }
      async createplayerName(player: Player) {
        try {
    
            const playerExist = await this.prismaService.player.findFirst({
                where:{
                    firstName: player.firstName
                }
            })
    
            if (playerExist) {
                throw new NotFoundException("Player déjà existante")
            }
    
            return await this.prismaService.player.create({
              data:player
            })
    
        } catch (error) {
            return new Error(error)
        }
      }
      async deletedPlayerById(id:number){
        try {
            const player = await this.prismaService.player.findUnique({
                where:{id}
            })
            if (!player) {
                throw new Error("player id not found")
            }
            return await this.prismaService.player.delete({
                where:{
                    id
                }
            })
        } catch (error) {
            return new Error(error)
        }
      }
}
