import { IsString, MinLength } from 'class-validator';

export class CreateTeam {
  @IsString({
    message: 'Le champ name doit être une chaîne de caractère',
  })
  @MinLength(3, {
    message: 'Le champ name  doit contenir 3 Caractères au minimum',
  })
  name: string;

  @IsString({
    message: 'Le champ country doit être une chaîne de caractère',
  })
  @MinLength(3, {
    message: 'Le champ country doit contenir 3 Caractères au minimum',
  })
  country: string;
}
