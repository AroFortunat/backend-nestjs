import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
} from 'class-validator';

/**
 * DTO utilisé pour créer un utilisateur
 * Correspond au model Prisma (sans id auto-increment)
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsEmail(
    {
        blacklisted_chars:"*$<^!#[]>%?&(){}"
    }
  )
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(128)
  // tu peux ajouter @Matches(...) si tu veux contraindre la complexité du mot de passe
  password: string;

  /**
   * createdAt est par défaut généré côté DB (now()).
   * On le laisse optionnel ici au cas où l'on voudrait l'expliciter.
   * On utilise IsDateString pour valider une date ISO (ex: "2025-10-17T12:34:56.000Z")
   */
  @IsOptional()
  @IsDateString()
  createdAt?: string;
}