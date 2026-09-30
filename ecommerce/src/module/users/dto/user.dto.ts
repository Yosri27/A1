import { IsEmail, IsEnum, IsMongoId, IsNumber, IsOptional, isString, IsString, IsStrongPassword, MaxLength, Min, MinLength } from "class-validator"
import { Types } from "mongoose"
import { GenderEnum } from "src/Enums/Gender.Enum"
import { RoleEnum } from "src/Enums/Role.Enum"
import is from "zod/v4/locales/is.js"

export class AddUserDto
{
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name!:string
    @IsEmail({})
    email!:string
    @IsStrongPassword()
    password!:string

    Phone!:string
    @IsNumber()
    @Min(16)
    @IsOptional()
    age!:number
    @IsEnum(RoleEnum)
    @IsString()
    @IsOptional()
    role?:string
    @IsEnum(GenderEnum)
    @IsString()
    gender!:string
}


export class deleteUserDto
{
    @IsMongoId()
    id!: Types.ObjectId

}