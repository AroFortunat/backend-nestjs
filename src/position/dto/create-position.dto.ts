import { IsString, Length } from "class-validator";

export class CreatePostionDTO {
    @IsString(
        {
            message:"Le nom de la positions doit être strictement de type string"
        }
    )
    @Length(4,25,
        {
            message:"Le longueur minimum doit être 3 et la longueur maximum doit être 25"
        }
    )
    name:string
}