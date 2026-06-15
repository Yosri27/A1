import { HydratedDocument } from "mongoose";
import userModel from "../../database/model/user.model.js";
import { DatabaseRepository } from "../../database/reposatory/base.reposatory.js";
import { Iuser } from "../../interface/user.interface.js";
import { BadRequestException } from "../../common/exceptions/application.exceptions.js";
import { s3service } from "../../services/s3.service.js";
import { MulterEnum } from "../../enums/multer.enums.js";

export class UserService
{
    private userReposatory : DatabaseRepository
    constructor()
    {
        this.userReposatory = new DatabaseRepository(userModel)
    }

    async getUserprofile(userid : string):Promise<HydratedDocument<Iuser>>
    {
        let userdata = await this.userReposatory.findById(userid,"-password")
        if (!userdata) {
            throw new BadRequestException("no data found")
        }
        return userdata
    }

    async updateUserprofile(userid : string,file : Express.Multer.File):Promise<{userdata: HydratedDocument<Iuser>, url : string}>
    {
        let userdata = await this.userReposatory.findById(userid,"-password")
        if (!userdata) {
            throw new BadRequestException("no data found")
        }
     
                let  {url,key} = await s3service.createPresignedUrl({
                    path:`${userdata._id}/profile-pic`,
                }) 
                // await userdata.save()
                userdata.profilePic = key as string
                await userdata.save()
         
            return {userdata,url}
        }

   async updateCoverPic(userid : string,files : Express.Multer.File[]):Promise<HydratedDocument<Iuser>>
    {
        let userdata = await this.userReposatory.findById(userid,"-password")
        if (!userdata) {
            throw new BadRequestException("no data found")
        }
        if(files.length > 0)
            {
                
            }
            return userdata
}





}

export const userservice = new UserService()