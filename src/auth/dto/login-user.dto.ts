// src/users/dto/login-user.dto.ts
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  // on normalise l'email (trim + lowercase) avant validation/usage
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(128)
  password: string;

  /**
   * Optionnel — utile si tu veux gérer une session persistante (cookie/token longue durée).
   * N'oublie pas d'activer `transform: true` dans ValidationPipe pour convertir correctement en boolean.
   */
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  rememberMe?: boolean;
}
