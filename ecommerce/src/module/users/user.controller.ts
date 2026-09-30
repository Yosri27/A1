import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { AddUserDto, deleteUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { CustomValidationPipe } from "src/common/pipe/validation.pipe";
import { addUserSchema } from "./user.valdition";



@Controller('users')


export class UserController
{
        constructor(private readonly userService: UserService)
        {
            
        }

@Get('all')

    getAllUsers()
    {
        let data = this.userService.getAllUsers
        return data
    }

@Post('add-user')
    adduser(@Body(new ValidationPipe()) data:AddUserDto)
    {
        let user = this.userService.addUser(data)
        return user
    }
    @Delete('delete-user/:id')
    deleteUser(@Param(new ValidationPipe()) data:deleteUserDto)
    {
        let user = this.userService.deleteUser(data)
        return user
    }

}