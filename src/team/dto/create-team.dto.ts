import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTeam {
  @IsString({
    message: 'Le champ name doit être une chaîne de caractère',
  })
  @MinLength(3, {
    message: 'Le champ name  doit contenir 3 Caractères au minimum',
  })
  @ApiProperty({
    description: "le nom de l'équipe",
    example:"Bayern Munchen",
    minLength:3,
    maxLength:30,
    required:true
  })
  name: string;

  @IsString({
    message: 'Le champ country doit être une chaîne de caractère',
  })
  @MinLength(3, {
    message: 'Le champ country doit contenir 3 Caractères au minimum',
  })
    @ApiProperty({
    description: "le nom du pays",
    example:"Allemagne",
    minLength:3,
    maxLength:30,
    required:true
  })
  country: string;
}
