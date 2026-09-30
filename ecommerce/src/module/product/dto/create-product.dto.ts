import { IsOptional, IsString, isString } from "class-validator"

export class CreateProductDto {


    @IsString()
    @IsOptional()
    titleAr! : String
    titleEn
    Price
    descAr
    descEN 



}
