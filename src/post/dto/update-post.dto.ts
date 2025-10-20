import { IsString, IsNotEmpty, IsDateString, IsInt, IsOptional } from "class-validator";

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category?: string;

  @IsString(    )
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  caption?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  date?: Date;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  minutesToRead?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  author?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  CatSlug: string;

  @IsString()
  @IsOptional()
  userEmail?: string;
}
