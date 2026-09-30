import { IsBoolean, isBoolean, IsBooleanString, IsEmail, IsEnum, IsNumber, IsString, IsStrongPassword, MaxLength, min, MinLength } from "class-validator"
import { GenderEnum } from "src/Enums/Gender.Enum"
import { RoleEnum } from "src/Enums/Role.Enum"

export class CreateAuthDto {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name!: string
    @IsEmail()
    email!: string
    @IsStrongPassword()
    password!: string
    @IsString()
    Phone!: string
   
 


}
