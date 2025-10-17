import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class GetTeamDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: "Obtenir l'équipe par l'id",
    minLength: 3,
    maxLength: 30,
    required: true,
  })
  id: number;
}
