import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCategorieDto {
  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  image?: string;
}
