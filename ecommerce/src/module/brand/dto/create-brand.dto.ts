import { Prop } from "@nestjs/mongoose"
import { IsString } from "class-validator"
import { Types } from "mongoose"
import { User } from "src/DB/models/user.model"

export class CreateBrandDto {

        @IsString()
        name!: string
    
        
}
